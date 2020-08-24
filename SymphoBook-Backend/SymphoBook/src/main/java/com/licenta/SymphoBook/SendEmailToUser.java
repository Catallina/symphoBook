package com.licenta.SymphoBook;


import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
public class SendEmailToUser {


	


    String sender;
    String destination;

   final String host = "smtp.gmail.com";

   Properties properties = System.getProperties();
    
    public SendEmailToUser( String sender, String destination)
    {
    	this.sender=sender;
    	this.destination=destination;
    }
 
    String getSender()
    {
    	return sender;
    }
    
    String getDestination()
    {
    	return destination;
    }
    String getHost()
    {
    	return host;
    }
    Properties getProperties()
    {
    	return properties;
    }
    
    
    public void SendEmail()
    {   // Setup mail server
    	  properties.put("mail.smtp.host", host);
          properties.put("mail.smtp.port", "465");
          properties.put("mail.smtp.ssl.enable", "true");
          properties.put("mail.smtp.auth", "true");
          Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

              protected PasswordAuthentication getPasswordAuthentication() {

                  return new PasswordAuthentication("miriamdavid1597@gmail.com", "Lucretia15");

              }

          });

          try {

              MimeMessage message = new MimeMessage(session);

              message.setFrom(new InternetAddress(sender));

              message.addRecipient(Message.RecipientType.TO, new InternetAddress(destination));

              message.setSubject("LICEEENTA");

              message.setText("E MAIL TRIMIS DIN COD HAHAHA");

              System.out.println("sending...");

              Transport.send(message);
              System.out.println("Sent message successfully....");
          } catch (MessagingException mex) {
              mex.printStackTrace();
          }
  
    }
}
