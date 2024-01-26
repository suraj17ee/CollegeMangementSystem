package com.collegemanagement.service;

import java.util.List;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dto.UserDto;

public interface UserService {
	
	public User registerUser(UserDto userDeatils);

	public List<User> fetchAllUsers();

	public User updateUserDetails(String id, UserDto userDeatils);

	public String deleteUserDetails(String email);

	public User fetchUserById(String id);
	
	public User fetchUserByEmail(String email);

	public String deleteAllUsersData();
	
}
