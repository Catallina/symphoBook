package com.example.demo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookJournalRepository extends MongoRepository<BookJournal,String> {
	
	public Optional<BookJournal> findById(String uid);

}
