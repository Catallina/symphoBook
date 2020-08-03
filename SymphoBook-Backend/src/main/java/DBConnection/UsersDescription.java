package DBConnection;

import java.util.HashMap;
import java.util.Map;

public class UsersDescription extends users{

	String description;
	String love;
	String birthday;
	String favorites;
	Map<String, Object> UserMapDescription ;
	
	
	public UsersDescription ()
	{}
	public UsersDescription (String description, String love, String birthday, String favorites)
	{
		
		this.description=description;
		this.love=love;
		this.birthday=birthday;
		this.favorites=favorites;
	}

	public void  setDescription(String description)
	{
		this.description=description;
	}
	public String getDescription() {
		return description;
	}
	public void setLove(String love)
	{
		this.love=love;
	}
	public String getLove()
	{
		return love;
	}
	public void setBirthday(String birthday)
	{
		this.birthday=birthday;
	}
	public String getBirthday()
	{
		return birthday;
	}
	public void setFavorites(String favorites)
	{
		this.favorites=favorites;
	}
	public String getFavorites()
	{
		return favorites;
	}
	public HashMap<String,Object> getUserMapDescription()

	{
		UserMapDescription = new HashMap<String, Object>();
		UserMapDescription.put("Description", description);
		UserMapDescription.put("Love", love);
	UserMapDescription.put("Birthday", birthday);
	UserMapDescription.put("Favorites", favorites);
		return (HashMap<String, Object>) UserMapDescription;
	}

	
	
}
