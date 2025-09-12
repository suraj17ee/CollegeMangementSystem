package com.collegemanagement.service.impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.collegemanagement.entity.UserImage;
import com.collegemanagement.exception.ImageLimitExceedException;
import com.collegemanagement.repository.UserImageRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dto.UserDto;
import com.collegemanagement.exception.PersonNotFoundException;
import com.collegemanagement.repository.UserDataRepository;
import com.collegemanagement.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserDataRepository userDataRepo;

	@Autowired
	private UserImageRepository imageDataRepo;

	@Value("${file.upload-dir}")
	private String uploadDir;

	@Override
	public User registerUser(UserDto userData) {
		if(userData.getUserEmail() == null || userData.getUserEmail()=="" || userData.getUserPassword() == null || userData.getUserPassword()=="") {
			log.error("User details not provided !!");
			throw new PersonNotFoundException("Please provide valid user details! Email and Password must required !!");
		} else if (userDataRepo.findByUserEmail(userData.getUserEmail()).isPresent()) {
			throw new PersonNotFoundException("User details already exists !!");
		} else {
			User user = new User();
			user.setUserName(userData.getUserName());
			user.setUserPassword(passwordEncoder.encode(userData.getUserPassword()));
			user.setUserEmail(userData.getUserEmail());
			user.setUserAddress(userData.getUserAddress());
			user.setUserMobile(userData.getUserMobile());
			user.setUserGender(userData.getUserGender());
			user.setUserDob(userData.getUserDob());
			user.setRoles(userData.getRoles());
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
	public User updateUserDetails(String id, UserDto userData) {
		if(userData.getUserEmail() == null || userData.getUserEmail()=="" || userData.getUserPassword() == null || userData.getUserPassword()=="") {
			log.error("Error occured while updating user !!");
			throw new PersonNotFoundException("Please provide valid user details to update !!");
		} else {
			User oldUserData = userDataRepo.findById(id).get();
			oldUserData.setUserName(userData.getUserName());
			oldUserData.setUserPassword(passwordEncoder.encode(userData.getUserPassword()));
			oldUserData.setUserEmail(userData.getUserEmail());
			oldUserData.setUserAddress(userData.getUserAddress());
			oldUserData.setUserMobile(userData.getUserMobile());
//			oldUserData.setUserGender(userData.getUserGender());
			oldUserData.setUserDob(userData.getUserDob());
//			oldUserData.setRoles(userData.getRoles());
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

	@Override
	public String saveUploadedImages(String userId, List<MultipartFile> files) {
		log.info("Started uploading files to database..");
		User user = userDataRepo.findById(userId)
				.orElseThrow(() -> new PersonNotFoundException("User details not found !!"));

		if (files.size() > 5 || user.getImages().size() > 5) {
			throw new ImageLimitExceedException("Limit exceeded!! You can only upload up to 5 files!");
		}
		Path filePath = null;
		try {
			for (MultipartFile file : files) {
				String uniqueName = userId + "_" + RandomStringUtils.randomAlphanumeric(6) + "_" + file.getOriginalFilename().replaceAll("\\s+", "_");
				filePath = Paths.get(uploadDir, uniqueName);

				// Ensure folder exists
				Files.createDirectories(filePath.getParent());

				// Save file locally
				Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

				// Save metadata in DB
				UserImage image = new UserImage();
				image.setFileName(uniqueName);
				image.setFileUrl("/uploads/" + uniqueName);
				image.setUser(user);

				imageDataRepo.save(image);
			}
		} catch (Exception e) {
			log.error("Exception occured while saving images in to db for user: {}", user.getUserEmail());
		}
		log.info("File saved at location: {}", filePath.toString());
		return "File saved at location: " + filePath.toString();
	}

	@Override
	public List<String> fetchUploadedImages(String userId) {
		log.info("Getting all the files present inside database..");
		User user = userDataRepo.findById(userId)
				.orElseThrow(() -> new PersonNotFoundException("User details not found !!"));

		List<String> images = imageDataRepo.findByUser(user)
				.stream()
				.map(UserImage::getFileUrl)
				.collect(Collectors.toList());
		log.info("Files present for {} inside database are: {}", user.getUserEmail(), images);
		return images;
	}

}
