package com.collegemanagement.entity.dao;

import java.util.Set;

import lombok.Data;

@Data
public class UserDao {
	private String userName;
	private String userPassword;
	private String userEmail;
	private String userAddress;
	private Set<String> roles;
}
