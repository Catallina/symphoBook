package com.example.demo;



import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class BookWishlist {
	

	@Id
	public String uid;
	@Field
	public List<String> ListIdBook;
	
	
	public BookWishlist() {
		
	}

	public BookWishlist( String uid, List<String> ListIdBook) {
	
		
		this.uid = uid;
		this.ListIdBook = ListIdBook;
		
	}


	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public List<String> getListIdBook() {
		return ListIdBook;
	}

	public void setListIdBook(List<String> listIdBook) {
		ListIdBook = listIdBook;
	}


	
	

	
	
	
	
	

}
