package com.example.demo;


import java.util.Map;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;
@Component
public class UserProfile  {
	
	String jsonUserProfile;
	
	public UserProfile() {}
	
	
	 
	public String getJsonUserProfile(String uid) throws InterruptedException
	{
			Gson gson = new Gson();
			Map<String, String> UserProfile;
			
			RetriveDataFromDbUserProfile profile = new RetriveDataFromDbUserProfile(uid);
			Thread t=new Thread(profile);
	
	    t.start();
	    Thread.sleep(10000);
	    t.join();
	    
	    UserProfile=profile.getUserProfile();
	   // System.out.println("VaLUE="+UserProfile.size());
	  jsonUserProfile = gson.toJson(UserProfile);
	  //  System.out.println("Json= "+jsonUserProfile);
	   return jsonUserProfile;
	    
	}
	
	

}
