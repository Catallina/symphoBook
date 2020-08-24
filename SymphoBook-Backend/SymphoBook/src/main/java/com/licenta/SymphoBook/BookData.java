package com.licenta.SymphoBook;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.DatabaseReference;
import com.google.gson.Gson;

import org.springframework.boot.autoconfigure.SpringBootApplication;
@Component
public class BookData implements CommandLineRunner {
	
	@Autowired
	private BookRepository repository;
	@Autowired
	private BookWishlistRepository wishlistRepository;
	@Autowired
	private BookJournalRepository journalRepository;
	Gson gson = new Gson();
	List<String>ListIdBook;
	BookWishlist OldWishlist;
	BookJournal OldJournal; 
	FireBaseService fbs = ConnectToBd.Connection();
	public BookData() {}
	public String getJsonAllBooksFrontPage()
	{
		
	
		String jsonBooksFrontPage="";

		
	List<BookHomepage> bookHomepageList = new ArrayList<BookHomepage>();
	for (Books book: repository.findAll())
		{
		
		bookHomepageList.add(new BookHomepage(book.getId(),book.getTitle(),book.getPhoto(),book.getAuthor(),book.getFirstMp3()));
	
		
		}
	jsonBooksFrontPage=gson.toJson(bookHomepageList);


		
		return jsonBooksFrontPage;
		
	}
	
	public String getJsonFromBookId(String id)
	{
	
		String jsonBooksId="";
		String error;
		Books bookFromId = repository.findById(id).orElse(null);
		if(bookFromId!=null)
		jsonBooksId=gson.toJson(bookFromId);
		else
			jsonBooksId="Book not found";
			
		return jsonBooksId;
	}
	public String putFavoriteTitle(String uid,String IdBook) throws FirebaseAuthException, InterruptedException
	{	
		String error="Added";
		List<String> ListFavorites;
		Map<String, Object> favorite = new HashMap<String,Object>();
		RetriveDataFromDbUserProfile profile = new RetriveDataFromDbUserProfile(uid);
		Thread t=new Thread(profile);
		   t.start();
		    Thread.sleep(10000);
		    t.join();
	    String favoriteBook=repository.findById(IdBook).orElse(null).getTitle();
		ListFavorites=profile.getListFavorites();
		if(ListFavorites.contains(favoriteBook))
		{
			error="Book already exists in Favorites!";
			return error;
		}
		else
		{
	//	FireBaseService fbs = ConnectToBd.Connection();
		
		UsersDescription userDescription = new UsersDescription(favoriteBook);
		ListFavorites.add(favoriteBook);
		favorite.put("Favorites",ListFavorites);
		UserRecord userRecord;
		userRecord = FirebaseAuth.getInstance().getUser(uid);
		   System.out.println("Successfully fetched user data: " + userRecord.getUid());
  DatabaseReference refAddUserDescription = fbs.getDb()
          .getReference("users");
  refAddUserDescription.child(userRecord.getUid()).updateChildrenAsync(favorite);
		  return error;
		
		}
	
	}
	
	public String deleteBookFromFavorite(String uid, String Title) throws FirebaseAuthException, InterruptedException
	{

		String error="Book is already deleted!";
		List<String> ListFavorites;
		
		//Map<String, Object> favorite = new HashMap<String,Object>();
		
		RetriveDataFromDbUserProfile profile = new RetriveDataFromDbUserProfile(uid);
		Thread t=new Thread(profile);
		   t.start();
		    Thread.sleep(10000);
		    t.join();
		    
	   Books favoriteBook=repository.findByTitle(Title);
		ListFavorites=profile.getListFavorites();////!
		if(ListFavorites.contains(favoriteBook.getTitle()))
		{
			ListFavorites.remove(favoriteBook.getTitle());
			
			int i = 0;
			Map<String, Object> mapFavorites = new HashMap<String,Object>();
			for(String title : ListFavorites){
				mapFavorites.put(String.valueOf(i),title);
			}
			//favorite.put("Favorites",ListFavorites);
			UserRecord userRecord;
			userRecord = FirebaseAuth.getInstance().getUser(uid);
			   System.out.println("Successfully fetched user data: " + userRecord.getUid());
	  DatabaseReference refAddUserDescription = fbs.getDb()
	          .getReference("users");
	  refAddUserDescription.child(userRecord.getUid()).child("Favorites").updateChildrenAsync(mapFavorites);
	  		error="Deleted!";
			  return error;
		}
		
		
		
		
		return error;
	}
	
	
	
	
	public String putBookInWishlist(String uid, String IdBook)
	{
		String error="Added";
		ListIdBook =new ArrayList<String>();
		BookWishlist wishlist;
		 OldWishlist = new BookWishlist();
		OldWishlist=wishlistRepository.findById(uid).orElse(null);
	
		ListIdBook.addAll(OldWishlist.getListIdBook());
		Collections.reverse(ListIdBook);
		if(ListIdBook.contains(IdBook))
		{
			error="Book already exists in Wishlist!";
			return error;
		}
			
		else
		{
		ListIdBook.add(IdBook);
		Collections.reverse(ListIdBook);
		wishlist = new BookWishlist(uid, ListIdBook);
		wishlistRepository.save(wishlist);
		return error;

		}
		
	}
	public String getJsonWishlistBook(String uid)
	{
		String jsonBooksWishlist="";
		
		 OldWishlist = new BookWishlist();
		OldWishlist=wishlistRepository.findById(uid).orElse(null);
		ListIdBook =new ArrayList<String>();
		List<BookHomepage> bookWishlistList = new ArrayList<BookHomepage>();
		ListIdBook.addAll(OldWishlist.getListIdBook());
		for(int i=0;i<ListIdBook.size();++i)
		{
			Books bookFromId = repository.findById(ListIdBook.get(i)).orElse(null);
			bookWishlistList.add(new BookHomepage(bookFromId.getId(),bookFromId.getTitle(),bookFromId.getPhoto(),bookFromId.getAuthor()));
		}
		jsonBooksWishlist = gson.toJson(bookWishlistList);
		
		return jsonBooksWishlist;
	}
	
	public String deleteBookFromWishlist(String uid, String IdBook)
	{
		
		String error ="Book is not in the Wishlist!";
		ListIdBook =new ArrayList<String>();
	
		BookWishlist wishlist;
		OldWishlist = new BookWishlist();
		OldWishlist=wishlistRepository.findById(uid).orElse(null);
		System.out.println(ListIdBook.size());
		ListIdBook.addAll(OldWishlist.getListIdBook());
		
		if(ListIdBook.contains(IdBook))
		{
			ListIdBook.remove(IdBook);
			wishlist=new BookWishlist(uid,ListIdBook);
			wishlistRepository.save(wishlist);
			error="Deleted!";
			
		}
		
		
		
		return error;
		
		
		
		
	
		
		
		
	
	}
	public String putBookInJournal(String uid, String IdBook)
	{
		String error="Added";
		ListIdBook =new ArrayList<String>();
		BookJournal journal;
	    OldJournal = new BookJournal();
		OldJournal=journalRepository.findById(uid).orElse(null);
	
		ListIdBook.addAll(OldJournal.getListIdBook());
		Collections.reverse(ListIdBook);
		ListIdBook.add(IdBook);
		 Collections.reverse(ListIdBook);
		journal = new BookJournal(uid, ListIdBook);
		journalRepository.save(journal);
		return error;

		
		
		
	}
	public String getJsonJournalBook(String uid)
	{
		String jsonBooksJournal="";
		OldJournal = new BookJournal();
		OldJournal=journalRepository.findById(uid).orElse(null);
	
		ListIdBook =new ArrayList<String>();
		List<BookHomepage> bookJournalList = new ArrayList<BookHomepage>();
		ListIdBook.addAll(OldJournal.getListIdBook());
		for(int i=0;i<ListIdBook.size();++i)
		{
			Books bookFromId = repository.findById(ListIdBook.get(i)).orElse(null);
			bookJournalList.add(new BookHomepage(bookFromId.getId(),bookFromId.getTitle(),bookFromId.getPhoto(),bookFromId.getAuthor()));
		}
		jsonBooksJournal = gson.toJson(bookJournalList);
		
		return jsonBooksJournal;
	}
	
	
	public String deleteJournalBook(String uid)
	{
		String error="";
		ListIdBook =new ArrayList<String>();
		BookJournal journal;
	    OldJournal = new BookJournal();
		OldJournal=journalRepository.findById(uid).orElse(null);
		ListIdBook.addAll(OldJournal.getListIdBook());
		if(!ListIdBook.isEmpty())
		{
			ListIdBook.clear();
			journal = new BookJournal(uid, ListIdBook);
			journalRepository.save(journal);
			error="Journal is deleted!";
			return error;
		
		}
		else
		{
			error="The Journal is already deleted!";
			return error;
		}
		
	}
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}

	
	

}