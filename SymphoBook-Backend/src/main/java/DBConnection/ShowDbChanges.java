package DBConnection;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.database.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ShowDbChanges implements Runnable {
    public void run() {
        FireBaseService fbs = null;
        try {
            fbs = new FireBaseService();
        } catch (IOException e) {
            e.printStackTrace();
        }

        DatabaseReference refPrintAdmin = fbs.getDb()
                .getReference("users/admin");
        refPrintAdmin.addValueEventListener(new ValueEventListener() {

            public void onDataChange(DataSnapshot dataSnapshot) {
                users us = dataSnapshot.getValue(users.class);
                System.out.println(us.toString());
            }
  


            public void onCancelled(DatabaseError error) {
                System.out.print("Error: " + error.getMessage());
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
	  SendEmailToUser email = new SendEmailToUser("miriamdavid1597@gmail.com","caatallina.gavril@gmail.com");
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
	       });
	      
	   }
	
	   
	 



    }
