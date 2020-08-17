package com.example.demo;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface BookRepository extends MongoRepository<Books,String> {
	
	public Books findByTitle(String title);
	
	
	

}
