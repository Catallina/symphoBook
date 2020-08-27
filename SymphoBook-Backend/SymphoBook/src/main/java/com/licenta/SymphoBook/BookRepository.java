package com.licenta.SymphoBook;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
public interface BookRepository extends MongoRepository<Books,String> {
	
	
	
	
	public Books findByTitle(String title);
	
	@Query(value = "{'title': {$regex : ?0, $options: 'i'}}")
	public List< Books >findAllByTitle(String query);
	
	public Optional<Books> findById(String id);
	
	
	
	

}
