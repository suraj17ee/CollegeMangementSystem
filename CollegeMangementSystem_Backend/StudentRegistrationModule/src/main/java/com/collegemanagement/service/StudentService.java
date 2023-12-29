package com.collegemanagement.service;

import java.util.List;

import com.collegemanagement.entity.Student;
import com.collegemanagement.entity.dao.StudentDao;

public interface StudentService {
	public Student registerStudent(StudentDao studentDeatils);
	public List<Student> fetchStudents();
}
