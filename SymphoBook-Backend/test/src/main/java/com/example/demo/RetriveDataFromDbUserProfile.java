package com.example.demo;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class RetriveDataFromDbUserProfile  implements Runnable {
	FireBaseService fbs=ConnectToBd.Connection();
	public Map<String, String> UserProfile = new HashMap<String, String>();
	String uid;
	String Description;
	public  RetriveDataFromDbUserProfile() {}
public  RetriveDataFromDbUserProfile(String uid)
	{
		this.uid=uid;
		
	}
public Map<String, String> getUserProfile()
{
	
	return UserProfile;
	
	}
public String getDescription()
{
	return Description;}
public void readData(String uid) {

	
	  UserRecord userRecord;
			try {
			userRecord = FirebaseAuth.getInstance().getUser(uid);
				//userRecord = FirebaseAuth.getInstance().
				   System.out.println("Successfully fetched user data: " + userRecord.getUid());
				   DatabaseReference refPrintUser = fbs.getDb()
			                .getReference("users").child(userRecord.getUid());
				  refPrintUser.addValueEventListener(new ValueEventListener() {

			            public void onDataChange(DataSnapshot dataSnapshot) {
			         /*      users us = dataSnapshot.getValue(users.class);
			              //  string jsonus=us..dataSnapshot;
			                
			                System.out.println(us.toString());*/
			            	String DisplayName=dataSnapshot.child("DisplayName").getValue(String.class);
			                String Description = dataSnapshot.child("Description").getValue(String.class);
			                String Birthday=dataSnapshot.child("Birthday").getValue(String.class);
			                String Email=dataSnapshot.child("Email").getValue(String.class);
			                String Love=dataSnapshot.child("Love").getValue(String.class);
			                UserProfile.put("DisplayName", DisplayName);
			                UserProfile.put("Description", Description);
			                UserProfile.put("Birthday", Birthday);
			                UserProfile.put("Email", Email);
			                UserProfile.put("Love",Love );
			           
			            
			            }
			  


			            public void onCancelled(DatabaseError error) {
			                System.out.print("Error: " + error.getMessage());
			            }
					   
				   });
				
			} catch (FirebaseAuthException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	
	
}
public void run()
{
		readData(uid);
}
	

}
