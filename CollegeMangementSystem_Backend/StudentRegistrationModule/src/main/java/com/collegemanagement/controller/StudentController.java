package com.collegemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
		return new ResponseEntity<>(registeredStudent, HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	private ResponseEntity<List<Student>> getStudents() {
		 List<Student> dbStudents = studentService.fetchStudents();
		return new ResponseEntity<>(dbStudents, HttpStatus.OK);
	}
}
