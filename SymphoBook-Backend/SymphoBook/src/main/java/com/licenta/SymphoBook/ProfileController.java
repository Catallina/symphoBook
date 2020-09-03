package com.licenta.SymphoBook;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {
	
	private final UserProfile profile ;
	public ProfileController(UserProfile profile)
	{
		this.profile=profile;
	}
	
	/*@GetMapping("users/profile")
	String profile(@RequestParam String uid) 
	{ 
		
		
		return profile.getJsonUserProfile(uid);
	}*/
	@GetMapping("users/profile") 
	ResponseEntity<String> profile( String uid) 
	{
		
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(profile.getJsonUserProfile( uid));
	}
	
	
}
