package DBConnection;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.database.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;
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
	
    public Boolean addDetailsforAccount(String Description,String Love, String Birthday,  String Favorites)
    {
    	
  	  UsersDescription userDescription=new UsersDescription(Description,Love,Birthday,Favorites);
  	  DatabaseReference refAddUserDescription = fbs.getDb()
               .getReference("users");
  	  refAddUserDescription.child(createAccountActivityInstance.getUserRecord().getUid()).updateChildrenAsync(userDescription.getUserMapDescription());
  	  return (createAccountActivityInstance.getUserRecord()!=null);
    }
	
 
	

}
