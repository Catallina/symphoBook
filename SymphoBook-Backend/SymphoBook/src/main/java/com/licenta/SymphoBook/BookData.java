package com.licenta.SymphoBook;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.DatabaseReference.CompletionListener;
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
	@Autowired
	private UserRepository userRepository;
	Gson gson = new Gson();
	List<BookHomepage> bookHomepageList;
	List<String>ListIdBook;
	BookWishlist OldWishlist;
	BookJournal OldJournal; 
	FireBaseService fbs = ConnectToBd.Connection();
	public BookData() {}

	
	
	
	
	
	
	public String getJsonAllBooksFrontPage()
	{
		
	
		String jsonBooksFrontPage="";

		
    bookHomepageList = new ArrayList<BookHomepage>();
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
	
	
	
	public String putFavoriteTitle(String uid, String IdBook)
	{
		
		
		String error="Added";
		//List<String> ListBook =new ArrayList<String>();
	     User bookFavorites;
		 bookFavorites= new User();
		 List<String> bookTitle=new ArrayList<String>();
		 
		 bookFavorites=userRepository.findById(uid).orElse(null);
		bookTitle.addAll(bookFavorites.getFavorites());
	
		if(bookTitle.contains(repository.findById(IdBook).orElse(null).getTitle()))
		{
			error="Book already exists in Favorites!";
			return error;
		}
			
		else
		{
		
		

		
		String favorite=repository.findById(IdBook).orElse(null).getTitle();
		bookTitle.add(favorite);
		bookFavorites.setFavorites(bookTitle);
		
		
		userRepository.save(bookFavorites);
		return error;

		}
		
		
	}
	
	
	
	

	
	public String deleteBookFromFavorite(String uid, String Title)
	{
		
	
		String error="The Favorites is already deleted!";
	
	     User bookFavorites;
		 bookFavorites= new User();
		 List<String> bookTitle=new ArrayList<String>();
		 bookFavorites=userRepository.findById(uid).orElse(null);
		 bookTitle.addAll(bookFavorites.getFavorites());
		 String bookToDelete=repository.findByTitle(Title).getTitle();
		if(bookTitle.contains(bookToDelete))
		{
			bookTitle.remove(bookToDelete);
			bookFavorites.setFavorites(bookTitle);
			userRepository.save(bookFavorites);
			error="Deleted!";
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
