package com.collegemanagement.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "UserDetails")
public class Student {
	@Id
	private String studentId;
	private String studentName;
	private String Address;
}
