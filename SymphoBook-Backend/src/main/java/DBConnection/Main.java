package DBConnection;
import com.google.firebase.database.*;
import com.google.gson.Gson;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.io.IOException;
public class Main {
	
	 public static void main(String[] args) throws IOException, InterruptedException, Throwable {
		//  ShowDbChanges sh= new ShowDbChanges();
		 Gson gson = new Gson();
		 Map<String, String> UserProfile;
		 RetriveDataFromDbUserProfile profile = new RetriveDataFromDbUserProfile("tudorel1995@yahoo.com");
		    Thread t=new Thread(profile);
		
		    t.start();
		    Thread.sleep(10000);
		    t.join();
		    
		    UserProfile=profile.getUserProfile();
		    System.out.println("VaLUE="+UserProfile.size());
		    String jsonUserProfile = gson.toJson(UserProfile);
		    System.out.println("Json= "+jsonUserProfile);
		   
		    
		   // System.out.println("VaLUE="+sh.getValue());
	        //t.run();
	      /*  try {
	         //   Thread.sleep(100000);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }
	    */
		    
		    
		    
	 
}}
