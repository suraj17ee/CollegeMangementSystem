package com.collegemanagement.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dto.UserDto;
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

	@Override
	public List<User> fetchAllUsers() {
		List<User> users = userDataRepo.findAll();
		log.info("User service fetch all users : {}", users.size());
		return users;
	}

	@Override
	public User updateUserDetails(String id, UserDto userDeatils) {
		User oldUserData = userDataRepo.findById(id).get();
		oldUserData.setUserName(userDeatils.getUserName());
		oldUserData.setUserPassword(userDeatils.getUserPassword());
		oldUserData.setUserEmail(userDeatils.getUserEmail());
		oldUserData.setUserAddress(userDeatils.getUserAddress());
		oldUserData.setRoles(userDeatils.getRoles());
		User updatedUserData = userDataRepo.save(oldUserData);
		log.info("User service update user by id: {}", updatedUserData.getUserId());
		return updatedUserData;
	}

	@Override
	public String deleteUserDetails(String email) {
		Optional<User> user = userDataRepo.findByUserEmail(email);
		if (user.isEmpty()) {
			log.error("Error occured while calling User service delete user by email");
			return "User Not Present!";
		} else {
			User usr = user.get();
			userDataRepo.delete(usr);
			log.info("User service delete user by email: {}", usr.getUserEmail());
			return usr.getUserEmail() + " user details deleted";
		}
	}

	@Override
	public User fetchUserById(String id) {
		log.info("User service fetch by user id: {}", id);
		return userDataRepo.findById(id).get();
	}
	
	@Override
	public User fetchUserByEmail(String email) {
		log.info("User service fetch by user email: {}", email);
		return userDataRepo.findByUserEmail(email).get();
	}

	@Override
	public String deleteAllUsersData() {
		userDataRepo.deleteAllInBatch();
		log.info("User service delete all users");
		return "All users details removed";
	}

}
