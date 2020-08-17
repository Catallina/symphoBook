package com.example.demo;

import org.springframework.data.mongodb.core.mapping.Field;

public class BookHomepage {

	public String id;
	public String title;
	public String photo;
	
	public BookHomepage() {}
	
	public BookHomepage(String id, String title, String photo) {
		
		this.id = id;
		this.title = title;
		this.photo = photo;
	
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	
	
	
	
	
}
