package com.collegemanagement.service;

import com.collegemanagement.entity.Student;
import com.collegemanagement.entity.dao.StudentDao;

public interface StudentService {
	public Student registerStudent(StudentDao studentDeatils);
}
