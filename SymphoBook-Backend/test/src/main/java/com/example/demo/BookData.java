package com.example.demo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;

import org.springframework.boot.autoconfigure.SpringBootApplication;
@Component
public class BookData implements CommandLineRunner {
	Map<String, String> booksFrontPage;
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
		
		bookHomepageList.add(new BookHomepage(book.getId(),book.getTitle(),book.getPhoto()));
	
		
		}
	jsonBooksFrontPage=gson.toJson(bookHomepageList);


		
		return jsonBooksFrontPage;
		
	}
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
	

}
