package com.licenta.SymphoBook;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@Document
public class User {

	@Id
	 String uid;
	@Field
	 String DisplayName;
	@Field
	 String Email;
	@Field
	 String Password;
	@Field
	 String PhoneNumber;
	@Field
	 String description;
	@Field
	 String love;
	@Field
	 String birthday;
	@Field
	 List<String> favorites;

	
	
	
	public User()
	{}

	public User(String uid)
	{
		
		this.uid=uid;
	}
	public User(String uid, List<String> favorites)
	{
		this.uid=uid;
		this.favorites=favorites;
	}
	public User (String Email, String Password)
	{
		this.Email=Email;
		this.Password=Password;
	
		
	}
	
	public User (String uid, List<String> favorites,String DisplayName, String Email,String PhoneNumber)
	{
		this.uid=uid;
		this.favorites=favorites;
		this.DisplayName=DisplayName;
		this.Email=Email;
	
		this.PhoneNumber=PhoneNumber;
		
	}
	public User (String DisplayName, String Email, String PhoneNumber, String description, String love, String birthday, List<String> favorites)
	{
		this.Email=Email;
		this.PhoneNumber=PhoneNumber;
		this.description=description;
		this.love=love;
		this.birthday=birthday;
		this.favorites=favorites;
	}
	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public void  setUserDisplayName(String DisplayName)
	{
		this.DisplayName=DisplayName;
	}
	public String getUserDisplayName()
	{
		return DisplayName;
		
	}
	public void setUserPassword(String Password)
	{
		this.Password=Password;
	}
	public String getUserPassword()
	{ 
		return Password;
		
	}
	public void setUserEmail(String Email)
	{
		this.Email=Email;
	}
	public String getUserEmail()
	{
		return Email;
	}
	public void setUserPhoneNumber(String PhoneNumber)
	{
		this.PhoneNumber=PhoneNumber;
	}
	public String getUserPhoneNumber()
	{
		return PhoneNumber;
	}

	public void  setDescription(String description)
	{
		this.description=description;
	}
	public String getDescription() {
		return description;
	}
	public void setLove(String love)
	{
		this.love=love;
	}
	public String getLove()
	{
		return love;
	}
	public void setBirthday(String birthday)
	{
		this.birthday=birthday;
	}
	public String getBirthday()
	{
		return birthday;
	}
	public void setFavorites(List<String> favorites)
	{
		this.favorites=favorites;
	}
	public List<String> getFavorites()
	{
		return favorites;
	}
	/*public HashMap<String,Object> getUserMapDescription()

	{
		UserMapDescription = new HashMap<String, Object>();
		UserMapDescription.put("Description", description);
		UserMapDescription.put("Love", love);
	UserMapDescription.put("Birthday", birthday);
	UserMapDescription.put("Favorites", favorites);
		return (HashMap<String, Object>) UserMapDescription;
	}*/

	  @Override
	    public String toString() { 
	        return String.format("DisplayName="+DisplayName+" Email="+Email+" PhoneNumber="+PhoneNumber); 
	    } 
	
}
