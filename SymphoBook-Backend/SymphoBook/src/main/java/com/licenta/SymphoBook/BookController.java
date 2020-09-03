package com.licenta.SymphoBook;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;
@RestController
@Component
public class BookController {

	
	private final BookData book;
	
	public BookController (BookData book)
	{
		
		this.book=book;
		
	}
	
	
	
	@GetMapping("homepage/book")   
	ResponseEntity<String> getBookFromId(@RequestParam String id)
	{	
		
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");

		Gson g = new Gson();
	 
		String jsonBooksId=book.getJsonFromBookId(id);
	
		if(jsonBooksId=="Book not found")
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(g.toJson(jsonBooksId));
			
		}
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(jsonBooksId);
	}
	@PostMapping("book/addfavorite")
	ResponseEntity<String> addToFavorite(@RequestParam String uid, @RequestParam String IdBook) 
	
	{
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		Gson g = new Gson();
		String jsonFavorites = book.putFavoriteTitle(uid,IdBook);
		if(jsonFavorites=="Book already exists in Favorites!")
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(g.toJson(jsonFavorites));
		}
	
			return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(g.toJson(jsonFavorites));

	}
	@PostMapping("book/wishlist")
	ResponseEntity<String> putBookInWishlist(@RequestParam String uid, @RequestParam String IdBook) 
	{HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		Gson g = new Gson();
		String jsonWishlist = book.putBookInWishlist(uid, IdBook);
		if(jsonWishlist.equals("Book already exists in Wishlist!"))
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(g.toJson(jsonWishlist));
		}
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(jsonWishlist);
	}
	@GetMapping("book/getwishlist")
	ResponseEntity<String> getWishlist(@RequestParam String uid)
	{		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		String jsonBookWishlist=book.getJsonWishlistBook(uid);
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(jsonBookWishlist);
	}
	@PostMapping("book/journal")
	ResponseEntity<String> putBookInJournal(@RequestParam String uid, @RequestParam String IdBook) 
	{	HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		Gson g = new Gson();
		String jsonJournal = book.putBookInJournal(uid, IdBook);
	
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(g.toJson(jsonJournal));
	}
	
	@GetMapping("book/getjournal")
	ResponseEntity<String> getJournal(@RequestParam String uid)
	{		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		String jsonBookJournal=book.getJsonJournalBook(uid);
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(jsonBookJournal);
	}
	@DeleteMapping("book/wishlistdelete")
	ResponseEntity<String> deleteBook(@RequestParam String uid, @RequestParam String IdBook)
	{	HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		Gson g = new Gson();
		String jsonDeleteWishlist="";
		jsonDeleteWishlist=book.deleteBookFromWishlist(uid, IdBook);
		if(jsonDeleteWishlist=="Book is not in the Wishlist!")
			return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(g.toJson(jsonDeleteWishlist));
		
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(g.toJson(jsonDeleteWishlist));
	}
	
	@DeleteMapping("book/journaldelete")
	ResponseEntity<String> deleteJournal(@RequestParam String uid)
	{	HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		Gson g = new Gson();
		String jsonDeleteJournal="";
		jsonDeleteJournal=book.deleteJournalBook(uid);
		if(jsonDeleteJournal=="The Journal is already deleted!")
			return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(g.toJson(jsonDeleteJournal));
		
		return ResponseEntity.status(HttpStatus.OK).body(g.toJson(jsonDeleteJournal));
	}
	

	@DeleteMapping("book/favoritedelete")
	ResponseEntity<String> deleteBookFavorite(@RequestParam String uid,@RequestParam String Title) 
	{		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		Gson g = new Gson();
		String jsonDeleteFavorite="";
		
		Title.replace("%20", " ");
		jsonDeleteFavorite=book.deleteBookFromFavorite(uid, Title);
		if(jsonDeleteFavorite=="The Favorites is already deleted!")
			return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(g.toJson(jsonDeleteFavorite));
		
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(g.toJson(jsonDeleteFavorite));
	}
}
