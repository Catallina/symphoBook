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

import com.google.gson.Gson;

import org.springframework.boot.autoconfigure.SpringBootApplication;
@Component
public class BookData implements CommandLineRunner {
	
	@Autowired
	private BookRepository repository;
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
		
		/*Optional<Books> bookFromId = repository.findById(id);
		if (bookFromId.isPresent())
		{
			Books book=bookFromId.get();
			jsonBooksId=gson.toJson(book);
			
		}
		else
		{
			error="Book not found";
			jsonBooksId=gson.toJson(error);
		}
	*/
		
		
		return jsonBooksId;
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
	

}
