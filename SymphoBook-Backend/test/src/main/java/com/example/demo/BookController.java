package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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
		System.out.println(book.getJsonAllBooksFrontPage());
		return ResponseEntity.status(HttpStatus.OK).body(book.getJsonAllBooksFrontPage());
		
	}
}
