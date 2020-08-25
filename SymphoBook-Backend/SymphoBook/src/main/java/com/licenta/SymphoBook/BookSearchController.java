package com.licenta.SymphoBook;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

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
public class BookSearchController {
private final BookSearch book;
	public BookSearchController(BookSearch book) {	
		this.book=book;
		this.book.getIdsDescriptionsandTagsfromBooks();
		this.book.indirectIndex();
		this.book.C=this.book.bookSearchList.size();
		this.book.D=this.book.indirectIndex.size();
	}
	
	/*@GetMapping("getdescriptionbooks")
	ResponseEntity<Map<String, Map<String, Integer>>> getDescriptionBooks()
	{
		
	//	return new ResponseEntity<>(book.getJsonAllBooksFrontPage(),HttpStatus.OK);
		//System.out.println(book.getJsonAllBooksFrontPage());
		return ResponseEntity.status(HttpStatus.OK).body(book.getIdsDescriptionsandTagsfromBooks());
		
	}
	@GetMapping("indirectindex")
	ResponseEntity<TreeMap<String, HashMap<String, Integer>>> getIndirectIndex()
	{
		
		
		return ResponseEntity.status(HttpStatus.OK).body(book.indirectIndex());
	}*/
	@GetMapping("book/search")
	ResponseEntity<String> getBooleanSearch(@RequestParam String query,@RequestParam String filter)
	{	query.replace("%20"," ");
		query.replace(" "," and ");
		query=query.toLowerCase();
		
		switch(filter) {
		
		case "General": if(book.getBooksFromBooleanSearch(query, filter)!="Not Found")
							return ResponseEntity.status(HttpStatus.OK).body(book.getBooksFromBooleanSearch(query,filter));
						
						return ResponseEntity.status(HttpStatus.NOT_FOUND).body(book.getBooksFromBooleanSearch(query,filter));
		
		case "Title":    if(book.SearchByTitle(query, filter)!="Not Found")
								return ResponseEntity.status(HttpStatus.OK).body(book.SearchByTitle(query,filter));
		
						return ResponseEntity.status(HttpStatus.NOT_FOUND).body(book.SearchByTitle(query,filter));
		
		default : return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" ");
		}
	}
		
		
		
}



