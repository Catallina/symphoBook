package com.example.demo;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class BookJournal {

	@Id
	public String uid;
	@Field
	public List<String> ListIdBook;
	
	
	public BookJournal() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BookJournal(String uid, List<String> listIdBook) {
		super();
		this.uid = uid;
		ListIdBook = listIdBook;
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
