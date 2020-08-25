package com.licenta.SymphoBook;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	ResponseEntity<String> getBooks( )
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
	ResponseEntity<String> addToFavorite(@RequestParam String uid, @RequestParam String IdBook) throws FirebaseAuthException, InterruptedException
	{
		Gson g = new Gson();
		String jsonFavorites = book.putFavoriteTitle(uid,IdBook);
		if(jsonFavorites=="Book already exists in Favorites!")
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(jsonFavorites));
		}
	
			return ResponseEntity.status(HttpStatus.OK).body(g.toJson(jsonFavorites));

	}
	@PostMapping("book/wishlist")
	ResponseEntity<String> putBookInWishlist(@RequestParam String uid, @RequestParam String IdBook) 
	{	Gson g = new Gson();
		String jsonWishlist = book.putBookInWishlist(uid, IdBook);
		if(jsonWishlist.equals("Book already exists in Wishlist!"))
		{
			return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(jsonWishlist));
		}
		return ResponseEntity.status(HttpStatus.OK).body(jsonWishlist);
	}
	@GetMapping("book/getwishlist")
	ResponseEntity<String> getWishlist(@RequestParam String uid)
	{
		String jsonBookWishlist=book.getJsonWishlistBook(uid);
		return ResponseEntity.status(HttpStatus.OK).body(jsonBookWishlist);
	}
	@PostMapping("book/journal")
	ResponseEntity<String> putBookInJournal(@RequestParam String uid, @RequestParam String IdBook) 
	{	Gson g = new Gson();
		String jsonJournal = book.putBookInJournal(uid, IdBook);
	
		return ResponseEntity.status(HttpStatus.OK).body(g.toJson(jsonJournal));
	}
	
	@GetMapping("book/getjournal")
	ResponseEntity<String> getJournal(@RequestParam String uid)
	{
		String jsonBookJournal=book.getJsonJournalBook(uid);
		return ResponseEntity.status(HttpStatus.OK).body(jsonBookJournal);
	}
	@DeleteMapping("book/wishlistdelete")
	ResponseEntity<String> deleteBook(@RequestParam String uid, @RequestParam String IdBook)
	{
		Gson g = new Gson();
		String jsonDeleteWishlist="";
		jsonDeleteWishlist=book.deleteBookFromWishlist(uid, IdBook);
		if(jsonDeleteWishlist=="Book is not in the Wishlist!")
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(jsonDeleteWishlist));
		
		return ResponseEntity.status(HttpStatus.OK).body(g.toJson(jsonDeleteWishlist));
	}
	
	@DeleteMapping("book/journaldelete")
	ResponseEntity<String> deleteJournal(@RequestParam String uid)
	{
		Gson g = new Gson();
		String jsonDeleteJournal="";
		jsonDeleteJournal=book.deleteJournalBook(uid);
		if(jsonDeleteJournal=="The Journal is already deleted!")
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(jsonDeleteJournal));
		
		return ResponseEntity.status(HttpStatus.OK).body(g.toJson(jsonDeleteJournal));
	}
	

	@DeleteMapping("book/favoritedelete")
	ResponseEntity<String> deleteBookFavorite(@RequestParam String uid,@RequestParam String Title) throws FirebaseAuthException, InterruptedException
	{
		Gson g = new Gson();
		String jsonDeleteFavorite="";
		
		Title.replace("%20", " ");
		jsonDeleteFavorite=book.deleteBookFromFavorite(uid, Title);
		if(jsonDeleteFavorite=="The Journal is already deleted!")
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(jsonDeleteFavorite));
		
		return ResponseEntity.status(HttpStatus.OK).body(g.toJson(jsonDeleteFavorite));
	}
}
