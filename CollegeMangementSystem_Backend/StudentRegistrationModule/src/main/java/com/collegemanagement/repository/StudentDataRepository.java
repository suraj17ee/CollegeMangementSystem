package com.collegemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.collegemanagement.entity.Student;

public interface StudentDataRepository extends JpaRepository<Student, Long> {

}
