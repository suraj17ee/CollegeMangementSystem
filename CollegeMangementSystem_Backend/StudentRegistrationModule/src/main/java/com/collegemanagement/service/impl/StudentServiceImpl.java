package com.collegemanagement.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collegemanagement.entity.Student;
import com.collegemanagement.entity.dao.StudentDao;
import com.collegemanagement.repository.StudentDataRepository;
import com.collegemanagement.service.StudentService;

@Service("studentService")
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentDataRepository studentDataRepo;

	@Override
	public Student registerStudent(StudentDao studentDeatils) {
		Student student = new Student();
		student.setStudentName(studentDeatils.getStudentName());
		student.setAddress(studentDeatils.getAddress());
		Student dbStudent = studentDataRepo.save(student);
		return dbStudent;
	}

	@Override
	public List<Student> fetchStudents() {
		List<Student> students = studentDataRepo.findAll();
		return students;
	}

}
