package com.collegemanagement.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dao.UserDao;
import com.collegemanagement.repository.UserDataRepository;
import com.collegemanagement.service.UserService;

@Service("userService")
public class StudentServiceImpl implements UserService {

	@Autowired
	private UserDataRepository userDataRepo;

	@Override
	public User registerUser(UserDao userDetails) {
		User user = new User();
		user.setUserName(userDetails.getUserName());
		user.setUserPassword(userDetails.getUserPassword());
		user.setUserEmail(userDetails.getUserEmail());
		user.setUserAddress(userDetails.getUserAddress());
		user.setRoles(userDetails.getRoles());
		User dbUser = userDataRepo.save(user);
		return dbUser;
	}

	@Override
	public List<User> fetchUsers() {
		List<User> users = userDataRepo.findAll();
		return users;
	}

	@Override
	public User updateUserDetails(Long id, UserDao userDeatils) {
		User oldUserData = userDataRepo.findById(id).get();
		oldUserData.setUserName(userDeatils.getUserName());
		oldUserData.setUserPassword(userDeatils.getUserPassword());
		oldUserData.setUserEmail(userDeatils.getUserEmail());
		oldUserData.setUserAddress(userDeatils.getUserAddress());
		oldUserData.setRoles(userDeatils.getRoles());
		User updatedUserData = userDataRepo.save(oldUserData);
		return updatedUserData;
	}

	@Override
	public String deleteUserDetails(String email) {
		Optional<User> user = userDataRepo.findByUserEmail(email);
		if (user.isEmpty()) {
			return "User Not Present!";
		} else {
			User usr = user.get();
			userDataRepo.delete(usr);
			return usr.getUserEmail() + " user details deleted";
		}
	}

	@Override
	public User fetchUserById(Long id) {
		return userDataRepo.findById(id).get();
	}

	@Override
	public String deleteAllUsersData() {
		userDataRepo.deleteAllInBatch();
		return "all users details removed";
	}

}
