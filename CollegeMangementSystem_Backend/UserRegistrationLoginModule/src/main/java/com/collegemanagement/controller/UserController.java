package com.collegemanagement.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dto.UserDto;
import com.collegemanagement.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://54.92.176.47:8002"})
@RequestMapping("/v1/user")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/cmsapp")
	private ResponseEntity<String> getLoaded(){
		return new ResponseEntity<>("backend application is up now!!", HttpStatus.OK);
	}

	@PostMapping("/signup")
	private ResponseEntity<User> saveUser(@RequestBody UserDto user) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User Post API called");
		stopWatch.start();
		User registeredUser = userService.registerUser(user);
		stopWatch.stop();
		log.info("Total time taken by User POST API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	private ResponseEntity<List<User>> getAllUsers() {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User Get all API called");
		stopWatch.start();
		List<User> dbUsers = userService.fetchAllUsers();
		stopWatch.stop();
		log.info("Total time taken by User GET All API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return new ResponseEntity<>(dbUsers, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	private ResponseEntity<User> getUser(@PathVariable String id) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User Get by id API called");
		stopWatch.start();
		User user = userService.fetchUserById(id);
		stopWatch.stop();
		log.info("Total time taken by User GET BY ID API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return ResponseEntity.ok(user);
	}

	@PatchMapping("/update/{id}")
	private ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody UserDto user) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User Updat by id API called");
		stopWatch.start();
		User updatedUserDetails = userService.updateUserDetails(id, user);
		stopWatch.stop();
		log.info("Total time taken by User UPDATE BY ID API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return ResponseEntity.ok(updatedUserDetails);
	}

	@DeleteMapping("/delete/{email}")
	private ResponseEntity<String> deleteUser(@PathVariable String email) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User Delete by email API called");
		stopWatch.start();
		String msg = userService.deleteUserDetails(email);
		stopWatch.stop();
		log.info("Total time taken by User DELETE BY EMAIL API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return ResponseEntity.ok(msg);
	}

	@DeleteMapping("/delete")
	private ResponseEntity<String> deleteAll() {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User Delete all API called");
		stopWatch.start();
		String msg = userService.deleteAllUsersData();
		stopWatch.stop();
		log.info("Total time taken by User DELETE All API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return ResponseEntity.ok(msg);
	}
	
	@GetMapping("/get/{email}")
	private ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User Get by email API called");
		stopWatch.start();
		User user = userService.fetchUserByEmail(email);
		stopWatch.stop();
		log.info("Total time taken by User GET BY EMAIL API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return ResponseEntity.ok(user);
	}

	@PostMapping("/{userId}/upload")
	public ResponseEntity<String> uploadUserImages(
			@PathVariable String userId,
			@RequestParam("files") List<MultipartFile> files) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User uploadUserImages API called");
		stopWatch.start();
		String message = userService.saveUploadedImages(userId, files);
		stopWatch.stop();
		log.info("Total time taken by User uploadUserImages API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return new ResponseEntity<>(message, HttpStatus.CREATED);
	}

	@GetMapping("/files/{userId}")
	public ResponseEntity<List<String>> getUserImages(@PathVariable String userId) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		log.info("User getUserImages API called");
		stopWatch.start();
		List<String> imageUrls = userService.fetchUploadedImages(userId);
		stopWatch.stop();
		log.info("Total time taken by User getUserImages API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return ResponseEntity.ok(imageUrls);
	}

}
