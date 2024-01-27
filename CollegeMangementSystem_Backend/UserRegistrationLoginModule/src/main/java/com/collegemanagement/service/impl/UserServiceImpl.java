package com.collegemanagement.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dto.UserDto;
import com.collegemanagement.exception.PersonNotFoundException;
import com.collegemanagement.repository.UserDataRepository;
import com.collegemanagement.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserDataRepository userDataRepo;

	@Override
	public User registerUser(UserDto userDetails) {
		if (ObjectUtils.isEmpty(userDetails) || userDetails == null) {
			log.error("User details not provided !!");
			throw new PersonNotFoundException("Please provide valid user details !!");
		} else {
			User user = new User();
			user.setUserName(userDetails.getUserName());
			user.setUserPassword(passwordEncoder.encode(userDetails.getUserPassword()));
			user.setUserEmail(userDetails.getUserEmail());
			user.setUserAddress(userDetails.getUserAddress());
			user.setUserMobile(userDetails.getUserMobile());
			user.setUserGender(userDetails.getUserGender());
			user.setUserDob(userDetails.getUserDob());
			user.setRoles(userDetails.getRoles());
			User dbUser = userDataRepo.save(user);
			log.info("User service register user : {}", dbUser.getUserId());
			return dbUser;
		}
	}

	@Override
	public List<User> fetchAllUsers() {
		List<User> users = userDataRepo.findAll();
		if (ObjectUtils.isEmpty(users)) {
			log.error("Error occured while fetching all user's details !!");
			throw new PersonNotFoundException("No user's details present in database !!");
		} else {
			log.info("User service fetch all users : {}", users.size());
			return users;
		}
	}

	@Override
	public User updateUserDetails(String id, UserDto userDetails) {
		if (ObjectUtils.isEmpty(userDetails) || userDetails == null) {
			log.error("Error occured while updating user !!");
			throw new PersonNotFoundException("Please provide user's detail to update !!");
		} else {
			User oldUserData = userDataRepo.findById(id).get();
			oldUserData.setUserName(userDetails.getUserName());
			oldUserData.setUserPassword(passwordEncoder.encode(userDetails.getUserPassword()));
			oldUserData.setUserEmail(userDetails.getUserEmail());
			oldUserData.setUserAddress(userDetails.getUserAddress());
			oldUserData.setRoles(userDetails.getRoles());
			User updatedUserData = userDataRepo.save(oldUserData);
			log.info("User service update user by id: {}", updatedUserData.getUserId());
			return updatedUserData;
		}
	}

	@Override
	public String deleteUserDetails(String email) {
		if (email.isEmpty() || email.isBlank()) {
			throw new PersonNotFoundException("Please provide a valid email !!");
		}
		Optional<User> optUser = userDataRepo.findByUserEmail(email);
		if (optUser.isEmpty()) {
			log.error("Error occured while removing users details by email : {}", email);
			throw new PersonNotFoundException("User not found with : " + email);
		} else {
			User user = optUser.get();
			userDataRepo.delete(user);
			log.info("User service delete user by email: {}", user.getUserEmail());
			return user.getUserEmail() + " user details deleted";
		}
	}

	@Override
	public User fetchUserById(String id) {
		if (id.isEmpty() || id.isBlank()) {
			throw new PersonNotFoundException("please provide a valid user id !!");
		} else {
			log.info("User service fetch by user id: {}", id);
			return userDataRepo.findById(id).get();
		}
	}

	@Override
	public User fetchUserByEmail(String email) {
		if (email.isEmpty() || email.isBlank()) {
			throw new PersonNotFoundException("Please provide a valid email !!");
		} else {
			log.info("User service fetch by user email: {}", email);
			return userDataRepo.findByUserEmail(email).get();
		}
	}

	@Override
	public String deleteAllUsersData() {
		userDataRepo.deleteAllInBatch();
		log.info("User service delete all users");
		return "All user's details removed";
	}

}
