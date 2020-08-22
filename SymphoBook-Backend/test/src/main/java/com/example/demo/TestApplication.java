package com.example.demo;

import org.springframework.boot.SpringApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.gson.Gson;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.changestream.ChangeStreamDocument;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TestApplication {
	
@Autowired
private BookRepository repository;



	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
		
	}
}

/*	@Override
	public void run(String... args) throws Exception
	{
		
		//DatabaseChangeListener change = new DatabaseChangeListener();
		//change.Change();
		/*MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
		 MongoDatabase db = mongoClient.getDatabase("SymphoBook");
		 MongoCollection<Document> collection = db.getCollection("books");
		 List<Bson> pipeline = Collections.singletonList(Aggregates.match(
			       Filters.in("operationType", Arrays.asList("insert", "update", "delete"))));
		 
			 MongoCursor<ChangeStreamDocument<Document>> watchCursor = 
			 collection.watch().iterator();
			 System.out.println(String.valueOf(watchCursor));
			 System.out.println("== open cursor ==");

			 Runnable task = () -> {
				 System.out.println("\tWaiting for events");
			     while (watchCursor.hasNext()) {
			    	 System.out.println("Yes!!!");
			    	 System.out.println(String.valueOf(watchCursor.next()));
			     }
			 };
			 new Thread(task).start();
	}


*/
		/*BookSearch b= new BookSearch();
		Map<String, ArrayList<String>> test = b.getIdsDescriptionsandTagsfromBooks();
		Gson g = new Gson();
		String json="";
		json=g.toJson(test);
		System.out.println(json);*/
		
		
	//	ArrayList<String> wordsForSearch;
	//	BookSearch b= new BookSearch();
	//	BookData d= new BookData();
		
		//wordsForSearch=b.getIdsDescriptionsandTagsfromBooks();
	///	Gson g = new Gson();
	//	String json="";
	//	json=g.toJson(wordsForSearch);
		//System.out.println(d.getJsonAllBooksFrontPage());


/*public static void main(String[] args) {
    SpringApplication.run(TestApplication.class, args);
  }}

	@Override
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

//}
//}

*/