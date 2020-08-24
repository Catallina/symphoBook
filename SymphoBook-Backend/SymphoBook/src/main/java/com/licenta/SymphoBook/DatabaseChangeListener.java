package com.licenta.SymphoBook;
import com.mongodb.Block;
import com.mongodb.client.MongoClient;
//import com.mongodb.MongoClient;
//import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.changestream.FullDocument;
import com.mongodb.client.model.changestream.ChangeStreamDocument;

import java.util.function.Consumer;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;


public class DatabaseChangeListener {
	@Autowired
	MongoClient mongoClient;
	
	public DatabaseChangeListener() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public void Change()
	{
	Block<ChangeStreamDocument<Document>> printBlock = new Block<ChangeStreamDocument<Document>>() {
	    @Override
	    public void apply(final ChangeStreamDocument<Document> changeStreamDocument) {
	        System.out.println("nou="+changeStreamDocument.getFullDocument());
	    }
	};
	

	//com.mongodb.client.MongoClient mongoClient = new com.mongodb.client.MongoClient(new MongoClientURI("mongodb://localhost:27017")); //,localhost:27018,localhost:27019
	MongoDatabase database = mongoClient.getDatabase("SymphoBook");
	MongoCollection<Document> collection = database.getCollection("books");
	
	collection.watch().forEach((Consumer<? super ChangeStreamDocument<Document>>) printBlock);
	
	}

	
}
