package com.licenta.SymphoBook;


import java.io.IOException;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.database.DatabaseReference;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
public class CreateAccountActivity {
	
	public static 	UserRecord userRecord;
	
	public Map<String,String> UserMap;
	public String uidUser;
	public CreateAccountActivity() {}
	
	public void CreateNewAccount(String Email, String Password, String PhoneNumber, String DisplayName) throws FirebaseAuthException {

		
		User us = new User(DisplayName,Email,Password,PhoneNumber);
		 UserMap = new HashMap<String,String>();
		UserMap.put("DisplayName", DisplayName);
		UserMap.put("Email", Email);
		UserMap.put("PhoneNumber", PhoneNumber);
		
		CreateRequest request = new CreateRequest()
			    .setEmail(us.getUserEmail())
			    .setEmailVerified(false)
			    .setPassword(us.getUserPassword())
			    .setPhoneNumber(us.getUserPhoneNumber())
			    .setDisplayName(us.getUserDisplayName())
			    .setDisabled(false);
	

	userRecord = FirebaseAuth.getInstance().createUser(request);
	
	uidUser=userRecord.getUid();
	
	
	
		System.out.println("Successfully created new user: " + userRecord.getUid());
		
		

		
		
	}
	public UserRecord getUserRecord()
	{
		return userRecord;
	}
	public HashMap<String,String> getUserMap()
	{
		return (HashMap<String, String>) UserMap;
	}


	
}