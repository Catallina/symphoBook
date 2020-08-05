package DBConnection;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShowDbChanges implements Runnable {
	FireBaseService fbs=ConnectToBd.Connection();
	public String value;

	public String getValue()
	{
		return value;
	}
	public void readData(final MyCallback myCallback) {
	
		
		
		DatabaseReference refPrintAdmin = fbs.getDb()
                .getReference("users/admin");
	   refPrintAdmin.addValueEventListener(new ValueEventListener() {
		  
	        @Override
	        
	        public void onDataChange(DataSnapshot dataSnapshot) {
	        	
	        	value = dataSnapshot.child("Email").getValue(String.class);
	          //  myCallback.onCallback(value);
	        }

	        @Override
	        public void onCancelled(DatabaseError databaseError) {}
	    });

	}
	
    public void run() {
      /* fbs = null;
        try {
            fbs = new FireBaseService();
        } catch (IOException e) {
            e.printStackTrace();
        }
*/
        
        DatabaseReference refPrintAdmin = fbs.getDb()
                .getReference("users/admin");
       final List<users> listuser=new ArrayList<users>();

        refPrintAdmin.addValueEventListener(new ValueEventListener() {

            public void onDataChange(DataSnapshot dataSnapshot) {
              /*  users us = dataSnapshot.getValue(users.class);
                listuser.add(us);
               // System.out.println(listuser.size());
                System.out.println(us.toString());*/
                String Email = dataSnapshot.child("Email").getValue(String.class);
                
            System.out.println(Email);
            }
           
            public void onCancelled(DatabaseError error) {
                System.out.print("Error: " + error.getMessage());
            }
        });
     
    	System.out.println("lala="+listuser.size());
    
    	readData(new MyCallback() {
    	    @Override
    	    public void onCallback(String value) {
    	    	  System.out.print(value);
    	    }
    	});
     /*  CreateAccountActivity uid = new CreateAccountActivity();
 try {
		uid.CreateAccount();
	} catch (FirebaseAuthException e) {
	//	TODO Auto-generated catch block
		e.printStackTrace();
	}
  //add from auth in db    
  /*  DatabaseReference refAddUser = fbs.getDb()
               .getReference("users");
	  refAddUser.child(uid.getUserRecord().getUid()).setValueAsync(uid.getUserMap());
	  UsersDescription userDescription=new UsersDescription("I love to swim","cats","15 may 1995","Shining by Stephen King");
	  DatabaseReference refAddUserDescription = fbs.getDb()
              .getReference("users");
	  refAddUserDescription.child(uid.getUserRecord().getUid()).updateChildrenAsync(userDescription.getUserMapDescription());*/
	 /* SendEmailToUser email = new SendEmailToUser("miriamdavid1597@gmail.com","caatallina.gavril@gmail.com");
	  email.SendEmail();
	  List<String>uidUsers;
	   uidUsers=CreateAccountActivity.getUidUsers();
	   String childForUsers="users";
		   DatabaseReference refPrintUser = fbs.getDb()
	               .getReference(childForUsers);
		   refPrintUser.addValueEventListener(new ValueEventListener() {

	           public void onDataChange(DataSnapshot dataSnapshot) {
	               String us = dataSnapshot.getValue(String.class);
	               System.out.println(us.toString());
	           }
	 


	           public void onCancelled(DatabaseError error) {
	               System.out.print("Error: " + error.getMessage());
	           }
	       });*/
        
        UserRecord userRecord;
		try {
			userRecord = FirebaseAuth.getInstance().getUserByEmail("tudorel1995@yahoo.com");
			   System.out.println("Successfully fetched user data: " + userRecord.getUid());
			   String reference="user/"+userRecord.getUid();
			   DatabaseReference refPrintUser = fbs.getDb()
		                .getReference("users").child(userRecord.getUid());
			
		
		//	var ptjosn;
			   //System.out.println(refPrintUser.child(reference));
			  refPrintUser.addValueEventListener(new ValueEventListener() {

		            public void onDataChange(DataSnapshot dataSnapshot) {
		         /*      users us = dataSnapshot.getValue(users.class);
		              //  string jsonus=us..dataSnapshot;
		                
		                System.out.println(us.toString());*/
		                String Description = dataSnapshot.child("Description").getValue(String.class);
		                System.out.println(Description);
		            
		            }
		  


		            public void onCancelled(DatabaseError error) {
		                System.out.print("Error: " + error.getMessage());
		            }
				   
			   });
			
		} catch (FirebaseAuthException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
     // See the UserRecord reference doc for the contents of userRecord.
  
	      
	   }
	
	   
	 



    }
