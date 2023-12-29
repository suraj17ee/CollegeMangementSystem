package com.collegemanagement.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.collegemanagement.entity.Student;

public interface StudentDataRepository extends MongoRepository<Student, Long> {

}
