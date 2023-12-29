package com.collegemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.collegemanagement.entity.Student;

@SpringBootApplication
public class StudentRegistrationModuleApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentRegistrationModuleApplication.class, args);
	}

}
