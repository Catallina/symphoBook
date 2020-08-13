package DBConnection;

import java.util.Map;

import com.google.gson.Gson;

public class UserProfile  {
	
	String jsonUserProfile;
	
	public UserProfile() {}
	
	
	 
	public String getJsonUserProfile() throws InterruptedException
	{
			Gson gson = new Gson();
			Map<String, String> UserProfile;
			
			RetriveDataFromDbUserProfile profile = new RetriveDataFromDbUserProfile("tudorel1995@yahoo.com");
			Thread t=new Thread(profile);
	
	    t.start();
	    Thread.sleep(10000);
	    t.join();
	    
	    UserProfile=profile.getUserProfile();
	   // System.out.println("VaLUE="+UserProfile.size());
	  jsonUserProfile = gson.toJson(UserProfile);
	  //  System.out.println("Json= "+jsonUserProfile);
	   return jsonUserProfile;
	    
	}
	
	

}
