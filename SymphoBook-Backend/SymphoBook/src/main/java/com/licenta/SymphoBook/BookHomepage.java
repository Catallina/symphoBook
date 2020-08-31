package com.licenta.SymphoBook;

import org.springframework.data.mongodb.core.mapping.Field;

public class BookHomepage {

	 String id;
	 String title;
	 String photo;
	 String author;
	 String mp3Url;
	
	public BookHomepage() {}
	
	public BookHomepage(String id, String title, String photo,String author,String mp3Url) {
		
		this.id = id;
		this.title = title;
		this.photo = photo;
		this.author=author;
		this.mp3Url=mp3Url;
	
	}
public BookHomepage(String id, String title, String photo,String author) {
		
		this.id = id;
		this.title = title;
		this.photo = photo;
		this.author=author;
}
	
	
	public String getMp3Url() {
		return mp3Url;
	}

	public void setMp3Url(String mp3Url) {
		this.mp3Url = mp3Url;
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
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	
	
	
	
	
	
}
