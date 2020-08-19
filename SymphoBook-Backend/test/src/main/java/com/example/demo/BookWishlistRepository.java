package com.example.demo;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
public interface BookWishlistRepository extends MongoRepository<BookWishlist,String>{
	public Optional<BookWishlist> findById(String uid);
}
