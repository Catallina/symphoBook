package com.licenta.SymphoBook;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;
@RestController
public class BookSearchController {
private final BookSearch book;
	public BookSearchController(BookSearch book) {	
		this.book=book;
		//this.book.getIdsDescriptionsandTagsfromBooks();
		//this.book.indirectIndex();
		
	    this.book.getIndirectIndex();
		this.book.getDirectIndex();
		this.book.getSimilarities();
		
		this.book.C=this.book.indirectIndex.size();
		this.book.D=this.book.bookSearchList.size();
	}
	
	@PutMapping("addbook")
	ResponseEntity<String> putBook(@RequestParam String uid,@RequestParam String photo, @RequestParam String title, @RequestParam String description,@RequestParam int chapters, @RequestParam String language,@RequestParam String year,
			@RequestParam	String author, @RequestParam List<String> mp3, @RequestParam String totalTime, @RequestParam List<String> tags)
	{
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		Gson gson=new Gson();
		String jsonBook;
		if(uid.equals("1gLJZWy7DFTFIbGZXOvznQtSpZ83"))
		{
			jsonBook=book.addBook(photo,title,description,chapters,language,year,author,mp3,totalTime,tags);
			
			if(jsonBook.equals("Book already exists!"))
			{
				return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(gson.toJson(jsonBook));
			}
			
			book.getIdsDescriptionsandTagsfromBooks();
			book.indirectIndex();
			book.calculateSimilarities();
			return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(gson.toJson(jsonBook));
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have rights!");
	}
	@GetMapping("gethomepagebooks")  //http://localhost:8080/gethomepagebooks
	ResponseEntity<String> getBooks( String uid) throws InterruptedException
	{
		
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(book.getJsonRecommendedBooks( uid));
	}
	@GetMapping("book/search")
	ResponseEntity<String> getSearch(@RequestParam String query,@RequestParam String filter)
	{	query.replace("%20"," ");
		query.replace(" "," and ");
		query=query.toLowerCase();
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		switch(filter) {
		
		case "General": if(book.getBooksFromBooleanSearch(query, filter).equals("[]"))
								return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(book.getBooksFromBooleanSearch(query,filter));
							
						else
							return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(book.getBooksFromBooleanSearch(query,filter));
		
		case "Title":    if(book.SearchByTitle(query, filter).equals("[]"))
			return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(book.SearchByTitle(query,filter));
						else
							return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(book.SearchByTitle(query,filter));
							
		
		default : return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(" ");
		}
	}
		
		
		
}



