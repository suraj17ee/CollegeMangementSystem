package com.collegemanagement.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.collegemanagement.entity.User;

public interface UserDataRepository extends JpaRepository<User, String> {
	
		Optional<User> findByUserEmail(String userEmail);
		
}
