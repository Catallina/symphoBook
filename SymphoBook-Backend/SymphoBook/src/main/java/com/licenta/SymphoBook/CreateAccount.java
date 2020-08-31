package com.licenta.SymphoBook;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

@Component
public class CreateAccount {
	@Autowired
	private BookWishlistRepository wishlistRepository;
	@Autowired
	private BookJournalRepository journalRepository;
	@Autowired
	private UserRepository userRepository;
	CreateAccountActivity createAccountActivityInstance;
	/*1*/FireBaseService fbs = ConnectToBd.Connection();
	Map<String, String> errors = new HashMap<String,String>();
	public CreateAccount() {}
	public String newAccount(String Email, String Password, String PhoneNumber, String DisplayName)
	{
		
		

		createAccountActivityInstance=new CreateAccountActivity();
		
		
		try {
			createAccountActivityInstance.CreateNewAccount(Email, Password, PhoneNumber, DisplayName);
			BookWishlist wishlist = new BookWishlist(createAccountActivityInstance.getUserRecord().getUid(),new ArrayList<String>());
			wishlistRepository.save(wishlist);
			BookJournal journal = new BookJournal(createAccountActivityInstance.getUserRecord().getUid(),new ArrayList<String>());
			journalRepository.save(journal);
			User  user =new User(createAccountActivityInstance.getUserRecord().getUid(),new ArrayList<String>(),DisplayName,Email,PhoneNumber);
			userRepository.save(user);
			
			
		}  catch (FirebaseAuthException e1) {
			
			
			errors.put(e1.getErrorCode(), e1.getLocalizedMessage());
			System.out.println("ERROR: " + e1.getErrorCode() + e1.getLocalizedMessage());
		}
		catch (IllegalArgumentException e2)
		
		{
	
			errors.put("password too short", e2.getMessage());
		}
		

		String errorMessage="Created";
		if(errors.containsKey("email-already-exists"))
		{
			errorMessage="Email already exists";
	
		}
		else
			if(errors.containsKey("internal-error"))
			{
				errorMessage="Invalid Phone Number";
			
				
				
			}
		
			else
				if(errors.containsKey("password too short"))
				{
					errorMessage="Password is too short";
					
				}
		
		  

		  return errorMessage;
	}
	

	
	public Boolean addDetailsforAccountAfter(String Description,String Love, String DisplayName, String Birthday,String uid) 
    {
		
	
		User user = userRepository.findById(uid).orElse(null);
		user.setDescription(Description);
		user.setLove(Love);
		user.setUserDisplayName(DisplayName);
		user.setBirthday(Birthday);
		userRepository.save(user);
		return user!=null;
		
    	
    	  
    	
    }
	
}