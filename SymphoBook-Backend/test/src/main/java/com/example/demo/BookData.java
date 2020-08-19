package com.example.demo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;

import java.util.ArrayList;
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
	public BookData() {}
	public String getJsonAllBooksFrontPage()
	{
		
		Gson gson = new Gson();
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
		Gson gson = new Gson();
		String jsonBooksId="";
		String error;
		Books bookFromId = repository.findById(id).orElse(null);
		if(bookFromId!=null)
		jsonBooksId=gson.toJson(bookFromId);
		else
			jsonBooksId="Book not found";
			
		return jsonBooksId;
	}
	public Boolean getFavoriteTitle(String id,String uid) throws FirebaseAuthException, InterruptedException
	{	
		List<String> ListFavorites;
		Map<String, Object> favorite = new HashMap<String,Object>();
		RetriveDataFromDbUserProfile profile = new RetriveDataFromDbUserProfile(uid);
		Thread t=new Thread(profile);
		   t.start();
		    Thread.sleep(10000);
		    t.join();
		ListFavorites=profile.getListFavorites();
		FireBaseService fbs = ConnectToBd.Connection();
		String favoriteBook=repository.findById(id).orElse(null).getTitle();
		UsersDescription userDescription = new UsersDescription(favoriteBook);
		ListFavorites.add(favoriteBook);
		favorite.put("Favorites",ListFavorites);
		UserRecord userRecord;
		userRecord = FirebaseAuth.getInstance().getUser(uid);
		   System.out.println("Successfully fetched user data: " + userRecord.getUid());
  DatabaseReference refAddUserDescription = fbs.getDb()
          .getReference("users");
  refAddUserDescription.child(userRecord.getUid()).updateChildrenAsync(favorite);
  return (userRecord.getUid()!=null);
		
		
	
	}
	public Boolean putBookInWishlist(String uid, String IdBook)
	{
		List<String>ListIdBook =new ArrayList<String>();
		BookWishlist OldWishlist = new BookWishlist();
		OldWishlist=wishlistRepository.findById(uid).orElse(null);
		ListIdBook.addAll(OldWishlist.getListIdBook());
		ListIdBook.add(IdBook);
		BookWishlist wishlist = new BookWishlist(uid, ListIdBook);
		wishlistRepository.save(wishlist);
		//return (ListIdBook.size()!=0);
		return (wishlist.getListIdBook().size()!=0);
		
		
		
	}
	public String getJsonWishlistBook()
	{
		return "";
	}
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}

	
	

}
