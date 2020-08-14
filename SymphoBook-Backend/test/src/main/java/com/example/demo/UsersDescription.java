package com.example.demo;


import java.util.HashMap;
import java.util.Map;

public class UsersDescription {

	String description;
	String love;
	String birthday;
	String favorites;
	users us;
	Map<String, Object> UserMapDescription ;
	
	
	public UsersDescription ()
	{}
	public UsersDescription (String description, String love, String birthday, String favorites)
	{
		
		this.description=description;
		this.love=love;
		this.birthday=birthday;
		this.favorites=favorites;
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
	        return String.format("DisplayName="+us.getUserDisplayName()+" Email="+us.getUserEmail()+" PhoneNumber="+us.getUserPhoneNumber()+" Description="+description+" Love="+love+" Birthday="+birthday+" Favorites"+favorites); 
	    } 
	
}