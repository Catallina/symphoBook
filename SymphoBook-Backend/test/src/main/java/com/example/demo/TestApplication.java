package com.example.demo;

import org.springframework.boot.SpringApplication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.gson.Gson;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TestApplication {
	
/*@Autowired
private BookRepository repository;*/

public static void main(String[] args) {
    SpringApplication.run(TestApplication.class, args);
  }}

/*	@Override
	public void run(String... args) throws Exception
	{
		//repository.deleteAll();
	//	repository.insert(new Books("test"));
	
		
		List<String> mp3 = new ArrayList<String>();
		mp3.add("a.mp3");
		mp3.add("b.mp3");
	//	Books b= new Books("Testmp3");
	//	b.setMp3(mp3);
		
		
		Gson gson = new Gson();
		String jsonBooksFrontPage="";
	
	
				//repository.insert(b);
	List<BookHomepage> bookHomepageList = new ArrayList<BookHomepage>();
	for (Books book: repository.findAll())
		{
		//jsonBooksFrontPage+=gson.toJson(book)+", ";
		//BooksFrontPage+=book.getTitle()+" "+book.getPhoto()+" ,";
		bookHomepageList.add(new BookHomepage(book.getId(),book.getTitle(),book.getPhoto()));
	
		
		}
	jsonBooksFrontPage=gson.toJson(bookHomepageList);
//	jsonBooksFrontPage = jsonBooksFrontPage.substring(0, jsonBooksFrontPage.length() - 2);
	//System.out.println(repository.findByTitle("Testmp3"));
	
	System.out.println(	jsonBooksFrontPage);
	//	System.out.println(repository.findByTitle("A Christmas Carol").getAuthor());
		
	}
/*public class TestApplication {
/*
	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
		
	}
*/
//}
//}