package com.example.demo;


import java.io.IOException;

public class ConnectToBd {
	
	public static FireBaseService Connection(){
		
		 FireBaseService fbs = null;
	        try {
	            fbs = new FireBaseService();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return fbs;
	}

}