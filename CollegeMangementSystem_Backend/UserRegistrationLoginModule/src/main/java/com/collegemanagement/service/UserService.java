package com.collegemanagement.service;

import java.util.List;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dao.UserDao;

public interface UserService {
	public User registerUser(UserDao userDeatils);
	public List<User> fetchUsers();
	public User updateUserDetails(String email, UserDao userDeatils);
	public String deleteUserDetails(String email);
}
