package com.licenta.SymphoBook;


import java.util.HashMap;
import java.util.Map;

public class UsersDescription {

	String description;
	String love;
	String birthday;
	String favorites;
	String DisplayName;
	users us;
	Map<String, Object> UserMapDescription ;
	
	
	public UsersDescription ()
	{}
	public UsersDescription (String description, String love,String DisplayName,String birthday)
	{
		
		this.description=description;
		this.love=love;
		this.DisplayName=DisplayName;
		this.birthday=birthday;
		//this.favorites=favorites;
	}
	
	public String getDisplayName() {
		return DisplayName;
	}
	public void setDisplayName(String displayName) {
		DisplayName = displayName;
	}
	public UsersDescription (String favorites)
	{
	
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
		UserMapDescription.put("DisplayName", DisplayName);
		UserMapDescription.put("Birthday", birthday);
		return (HashMap<String, Object>) UserMapDescription;
	}

	  @Override
	    public String toString() { 
	        return String.format("DisplayName="+us.getUserDisplayName()+" Email="+us.getUserEmail()+" PhoneNumber="+us.getUserPhoneNumber()+" Description="+description+" Love="+love+" Birthday="+birthday+" Favorites"+favorites); 
	    } 
	
}
