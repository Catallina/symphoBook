package com.licenta.SymphoBook;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.FirebaseDatabase;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;


public class FireBaseService {


	public  FirebaseDatabase db;
	  GoogleCredentials credentials ;
	  FirebaseOptions options;
	  InputStream serviceAccount ;
    public FireBaseService() throws IOException {
      //  File file = new File(
      //          getClass().getClassLoader().getResource("/SymphoBook.Licenta/src/resources/symphobook-43327-firebase-adminsdk-ky152-d5d61875f1.json").getFile()
     //   );

    	
    	serviceAccount = new FileInputStream("C:\\licenta\\SymphoBook.Licenta\\src\\resources\\symphobook-43327-firebase-adminsdk-ky152-4a2b608712.json");
        credentials = GoogleCredentials.fromStream(serviceAccount);
        options = new FirebaseOptions.Builder().setStorageBucket("symphobook-43327.appspot.com")
                .setCredentials(credentials)
                .setDatabaseUrl("https://symphobook-43327.firebaseio.com")
                .build();
        if(FirebaseApp.getApps().isEmpty()) 
            FirebaseApp.initializeApp(options);
       // FirebaseApp.initializeApp(options);

   db = FirebaseDatabase.getInstance();
    }

    public FirebaseDatabase getDb() {
        return db;
    }
    public GoogleCredentials getGoogleCredentials() {
        return credentials;
    }
    public  FirebaseOptions getFirebaseOptions()
    {
    	return options;
    }
    
    public InputStream getServiceAccount()
    {
    	return serviceAccount;
    }
}
