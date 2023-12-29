package com.collegemanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.collegemanagement.entity.Student;
import com.collegemanagement.entity.dao.StudentDao;
import com.collegemanagement.service.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@PostMapping
	private ResponseEntity<Student> saveStudent(@RequestBody StudentDao student) {
		Student registeredStudent = studentService.registerStudent(student);
		return new ResponseEntity<Student>(registeredStudent, HttpStatus.CREATED);
	}
}
