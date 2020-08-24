package com.licenta.SymphoBook;

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
	
	@GetMapping("users/profile")
	String profile(@RequestParam String uid) throws InterruptedException
	{
		return profile.getJsonUserProfile(uid);
	}
	
	
}
