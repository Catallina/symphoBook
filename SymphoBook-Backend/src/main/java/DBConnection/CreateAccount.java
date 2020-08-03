package DBConnection;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.database.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class CreateAccount {
	
	CreateAccountActivity createAccountActivityInstance;
	FireBaseService fbs = ConnectToBd.Connection();
	public CreateAccount() {}
	public Boolean newAccount(String Email, String Password, String PhoneNumber, String DisplayName)
	{
		
		
		
		createAccountActivityInstance=new CreateAccountActivity();
		
		
		try {
			createAccountActivityInstance.CreateNewAccount(Email, Password, PhoneNumber, DisplayName);
		} catch (FirebaseAuthException e) {
		//	TODO Auto-generated catch block
			e.printStackTrace();
		}
		DatabaseReference refAddUser = fbs.getDb().getReference("users");
		  refAddUser.child(createAccountActivityInstance.getUserRecord().getUid()).setValueAsync(createAccountActivityInstance.getUserMap());
		  return (createAccountActivityInstance.getUserRecord()!=null);
	}
	
    public void addDetailsforAccount()
    {
    	DatabaseReference refAddUser = fbs.getDb()
                .getReference("users");
  	  refAddUser.child(createAccountActivityInstance.getUserRecord().getUid()).setValueAsync(createAccountActivityInstance.getUserMap());
  	  UsersDescription userDescription=new UsersDescription("I love to swim","cats","15 may 1995","Shining by Stephen King");
  	  DatabaseReference refAddUserDescription = fbs.getDb()
               .getReference("users");
  	  refAddUserDescription.child(createAccountActivityInstance.getUserRecord().getUid()).updateChildrenAsync(userDescription.getUserMapDescription());
    }
	
 
	

}
