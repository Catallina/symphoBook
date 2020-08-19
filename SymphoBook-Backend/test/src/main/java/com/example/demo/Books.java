package com.example.demo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@Document
public class Books {
	
	@Id
	public String id;
	@Field
	public String photo;
	@Field
	public String title;
	@Field
	public String description;
	@Field
	public int chapters;
	@Field
	public String language;
	@Field
	public String year;
	@Field
	public String author;
	@Field
	public List<String>mp3;
	@Field
	public String totalTime;
	@Field
	public List<String> tags;
	
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getChapters() {
		return chapters;
	}
	public void setChapters(int chapters) {
		this.chapters = chapters;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public List<String> getMp3() {
		return mp3;
	}
	public String getFirstMp3() {
		return mp3.get(0);
	}
	public void setMp3(List<String> mp3) {
		this.mp3 = mp3;
	}
	public String getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(String totalTime) {
		this.totalTime = totalTime;
	}

	//public <String> mp3=new ArrayList<String>();

	public Books () {}
	public Books(String photo, String title, String description, int chapters, String language, String year, String author, List<String> mp3, String totalTime,List<String> tags)
	{
		this.photo=photo;
		this.title=title;
		this.description=description;
		this.chapters=chapters;
		this.language=language;
		this.year=year;
		this.author=author;
		this.mp3=mp3;
		this.totalTime=totalTime;
		this.tags=tags;
	}
	public Books(String title)
	{
		this.title=title;
	}
	
	@Override
	public String toString()
	{
		return String.format("Title="+title+" Author= "+author+" description="+description+" mp3size="+mp3.size()+ " primu="+mp3.get(0));
	}
	

}
