package com.example.demo;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
public interface BookRepository extends MongoRepository<Books,String> {
	
	public Books findByTitle(String title);
	public Optional<Books> findById(String id);
	
	
	
	

}
