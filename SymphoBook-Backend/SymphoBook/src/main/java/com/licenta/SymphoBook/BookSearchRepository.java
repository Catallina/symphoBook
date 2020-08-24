package com.licenta.SymphoBook;

import java.util.HashMap;
import java.util.TreeMap;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookSearchRepository extends MongoRepository<BookSearch,TreeMap<String, HashMap<String, Integer>>>{

	
	
	

}
