package com.licenta.SymphoBook;

import java.util.List;

import javax.annotation.PostConstruct;

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

import com.google.firebase.auth.FirebaseAuthException;
import com.google.gson.Gson;

@RestController
public class CreateUserController {
	
	private final CreateAccount newUser;

	CreateUserController(CreateAccount newUser)
	{
		this.newUser=newUser;
	}
	
	@PostMapping("users/createaccount") // POST /users/createaccount?Email=a@b.com&Password=abc&PhoneNumber=123&DisplayName=a
	ResponseEntity<String> createaccount(@RequestParam String Email, @RequestParam String Password, @RequestParam String PhoneNumber, @RequestParam String DisplayName)
			{
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		PhoneNumber = "+"+PhoneNumber;
						String eroareamea = newUser.newAccount(Email,Password,PhoneNumber, DisplayName);
						switch(eroareamea) {
						case"Created": return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(eroareamea);
												
						case "Email already exists": return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(responseHeaders).body(eroareamea);
												
						case "Invalid Phone Number": return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(responseHeaders).body(eroareamea);
													
						case"Password is too short": return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(responseHeaders).body(eroareamea);
													
						default :return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(responseHeaders).body("");
						}
					
			}

	@PutMapping("users/adddetails") // Put http://localhost:8080/users/adddetails?Description=ab&Love=abc&Birthday=ab&uid=aaaaa
	ResponseEntity<Boolean> addDetailsAfter(@RequestParam(required=false) String Description,@RequestParam(required=false) String Love,@RequestParam String DisplayName, @RequestParam(required=false) String Birthday,@RequestParam String uid) throws FirebaseAuthException
	{ 	
		HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders.set("Access-Control-Allow-Origin", "*");
		return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(newUser.addDetailsforAccountAfter(Description,Love,DisplayName,Birthday,uid));
		
	}
}
