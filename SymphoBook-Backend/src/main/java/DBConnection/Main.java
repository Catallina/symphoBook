package DBConnection;
import com.google.firebase.database.*;
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
import java.util.concurrent.ExecutionException;
import java.io.IOException;
public class Main {
	
	 public static void main(String[] args) throws IOException, InterruptedException, Throwable {
		    Thread t=new Thread(new ShowDbChanges());

	        t.run();
	        try {
	            Thread.sleep(100000);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
	        }
	    
	 
}}
