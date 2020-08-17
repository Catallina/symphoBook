package com.example.demo;

import java.util.List;

import javax.annotation.PostConstruct;

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

import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;

@RestController
public class CreateUserController {
	
	private final CreateAccount newUser;

	CreateUserController(CreateAccount newUser)
	{
		this.newUser=newUser;
	}
	
	@PostMapping("/users/createaccount") // POST /users/createaccount?Email=a@b.com&Password=abc&PhoneNumber=123&DisplayName=a
	ResponseEntity<String> createaccount(@RequestParam String Email, @RequestParam String Password, @RequestParam String PhoneNumber, @RequestParam String DisplayName)
			{
		PhoneNumber = "+"+PhoneNumber;
						String eroareamea = newUser.newAccount(Email,Password,PhoneNumber, DisplayName);
						switch(eroareamea) {
						case"Created": return new ResponseEntity<>(eroareamea,HttpStatus.OK);
												
						case "Email already exists": return new ResponseEntity<>(eroareamea,HttpStatus.FORBIDDEN);
												
						case "Invalid Phone Number": return new ResponseEntity<>(eroareamea,HttpStatus.FORBIDDEN);
													
						case"Password is too short": return new ResponseEntity<>(eroareamea,HttpStatus.FORBIDDEN);
													
						default : return new ResponseEntity<>("",HttpStatus.FORBIDDEN);
						}
						//return new ResponseEntity<>(stringu,HttpStatus.OK);
			}
	
/*	@PostMapping("/users/createaccount") // POST /users/createaccount?Email=a@b.com&Password=abc&PhoneNumber=123&DisplayName=a
	String createaccount(@RequestParam String Email, @RequestParam String Password, @RequestParam String PhoneNumber, @RequestParam String DisplayName)
	{
		PhoneNumber = "+"+PhoneNumber;
		
		return newUser.newAccount(Email,Password,PhoneNumber, DisplayName);
	}*/
	//daca useru nou vrea in momentu ala sa isi adauge detalii
	@PostMapping("/users/adddetails")
	Boolean addDetails (@RequestParam String Description, @RequestParam String Love, @RequestParam String Birthday, @RequestParam String Favorites)
	
	{
		return newUser.addDetailsforAccount(Description, Love, Birthday, Favorites);
		
	}
	
	@PostMapping("users/adddetails/after")
	Boolean addDetailsAfter(@RequestParam String Description,@RequestParam String Love,@RequestParam  String Birthday, @RequestParam  String Favorites,@RequestParam String email) throws FirebaseAuthException
	{
		return newUser.addDetailsforAccountAfter(Description, Love, Birthday, Favorites, email);
	}
}
