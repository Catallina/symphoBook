package com.licenta.SymphoBook;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
@Component
public class UserProfile  {
	@Autowired
	UserRepository userRepository;

	
	public UserProfile() {}
	
	
	public String getJsonUserProfile(String uid)
	{
		Gson gson = new Gson();
		String jsonUserProfile="";
		User user= new User();
		user=userRepository.findById(uid).orElse(null);
		
		jsonUserProfile=gson.toJson(user);
		return jsonUserProfile;

	}
	
	

}
