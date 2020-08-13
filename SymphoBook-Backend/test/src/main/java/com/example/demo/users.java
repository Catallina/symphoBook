package com.example.demo;


import java.util.HashMap;
import java.util.Map;

public class users {

	public String DisplayName;
	public String Email;
	public String Password;
	public String PhoneNumber;
	public String description;
	public String love;
	public String birthday;
	public String favorites;
	public Map<String, Object> UserMapDescription ;
	
	
	
	public users()
	{}
	public users (String DisplayName, String Email, String PhoneNumber)
	{
		this.DisplayName=DisplayName;
		this.Email=Email;
		this.PhoneNumber=PhoneNumber;
	}
	public users (String DisplayName, String Email,String Password, String PhoneNumber)
	{
		this.DisplayName=DisplayName;
		this.Email=Email;
		this.Password=Password;
		this.PhoneNumber=PhoneNumber;
		
	}
	public users (String DisplayName, String Email,String Password, String PhoneNumber, String description, String love, String birthday, String favorites)
	{
		this.Email=Email;
		this.Password=Password;
		this.PhoneNumber=PhoneNumber;
		this.description=description;
		this.love=love;
		this.birthday=birthday;
		this.favorites=favorites;
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
	public void setFavorites(String favorites)
	{
		this.favorites=favorites;
	}
	public String getFavorites()
	{
		return favorites;
	}
	public HashMap<String,Object> getUserMapDescription()

	{
		UserMapDescription = new HashMap<String, Object>();
		UserMapDescription.put("Description", description);
		UserMapDescription.put("Love", love);
	UserMapDescription.put("Birthday", birthday);
	UserMapDescription.put("Favorites", favorites);
		return (HashMap<String, Object>) UserMapDescription;
	}

	  @Override
	    public String toString() { 
	        return String.format("DisplayName="+DisplayName+" Email="+Email+" PhoneNumber="+PhoneNumber); 
	    } 
	
}
