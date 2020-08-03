package DBConnection;

public class users {

	public String DisplayName;
	public String Email;
	public String Password;
	public String PhoneNumber;
	
	
	
	public users()
	{}
	public users (String DisplayName, String Email, String PhoneNumber)
	{
		this.DisplayName=DisplayName;
		this.Email=Email;
		this.PhoneNumber=PhoneNumber;
	}
	public users (String DisplayName, String Email,String Password, String PhoneNumber)
	{
		this.DisplayName=DisplayName;
		this.Email=Email;
		this.Password=Password;
		this.PhoneNumber=PhoneNumber;
		
	}
	public void  setUserDisplayName(String DisplayName)
	{
		this.DisplayName=DisplayName;
	}
	public String getUserDisplayName()
	{
		return DisplayName;
		
	}
	public void setUserPassword(String Password)
	{
		this.Password=Password;
	}
	public String getUserPassword()
	{ 
		return Password;
		
	}
	public void setUserEmail(String Email)
	{
		this.Email=Email;
	}
	public String getUserEmail()
	{
		return Email;
	}
	public void setUserPhoneNumber(String PhoneNumber)
	{
		this.PhoneNumber=PhoneNumber;
	}
	public String getUserPhoneNumber()
	{
		return PhoneNumber;
	}
	  @Override
	    public String toString() { 
	        return String.format("DisplayName="+DisplayName+" Email="+Email+" PhoneNumber="+PhoneNumber); 
	    } 
	
}
