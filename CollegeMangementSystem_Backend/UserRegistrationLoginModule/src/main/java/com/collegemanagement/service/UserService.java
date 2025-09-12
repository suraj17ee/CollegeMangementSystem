package com.collegemanagement.service;

import java.sql.Blob;
import java.util.List;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
	
	public User registerUser(UserDto userDeatils);

	public List<User> fetchAllUsers();

	public User updateUserDetails(String id, UserDto userDeatils);

	public String deleteUserDetails(String email);

	public User fetchUserById(String id);
	
	public User fetchUserByEmail(String email);

	public String deleteAllUsersData();

	public String saveUploadedImages(String userId, List<MultipartFile> files);

	public List<String> fetchUploadedImages(String userId);
}
