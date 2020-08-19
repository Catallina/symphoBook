package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;
@RestController
public class BookController {

	
	private final BookData book;
	public BookController (BookData book)
	{
		
		this.book=book;
		
	}
	
	@GetMapping("gethomepagebooks")  //http://localhost:8080/gethomepagebooks
	ResponseEntity<String> getBooks()
	{
		
	//	return new ResponseEntity<>(book.getJsonAllBooksFrontPage(),HttpStatus.OK);
		//System.out.println(book.getJsonAllBooksFrontPage());
		return ResponseEntity.status(HttpStatus.OK).body(book.getJsonAllBooksFrontPage());
		
	}
	
	@GetMapping("homepage/book")   //http://localhost:8080/homepage/book?id=
	ResponseEntity<String> getBookFromId(@RequestParam String id)
	{	Gson g = new Gson();
		String jsonBooksId=book.getJsonFromBookId(id);
	
		if(jsonBooksId=="Book not found")
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(jsonBooksId));
			
		}
		return ResponseEntity.status(HttpStatus.OK).body(jsonBooksId);
	}
	@PostMapping("book/addfavorite")
	ResponseEntity<Boolean> addToFavorite(@RequestParam String id, @RequestParam String uid) throws FirebaseAuthException, InterruptedException
	{
		return ResponseEntity.status(HttpStatus.OK).body(book.getFavoriteTitle(id, uid));
	}
	@PostMapping("book/wishlist")
	ResponseEntity<Boolean> putBookInWishlist(@RequestParam String uid, @RequestParam String IdBook) 
	{
		return ResponseEntity.status(HttpStatus.OK).body(book.putBookInWishlist(uid, IdBook));
	}
	
}
