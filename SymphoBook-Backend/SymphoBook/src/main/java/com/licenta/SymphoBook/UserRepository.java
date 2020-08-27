package com.licenta.SymphoBook;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository

public interface UserRepository extends MongoRepository<User,String>{


	public Optional<User> findById(String uid);

	
	
}
