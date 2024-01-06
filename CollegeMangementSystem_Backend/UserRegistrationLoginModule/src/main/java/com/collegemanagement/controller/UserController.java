package com.collegemanagement.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dao.UserDto;
import com.collegemanagement.service.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping
	private ResponseEntity<User> saveUser(@RequestBody UserDto user) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
        log.info("User Post API called");
        stopWatch.start();
		User registeredUser = userService.registerUser(user);
		 stopWatch.stop();
	        log.info("Total time taken by User POST API : {}", 
	        		stopWatch.getTotalTimeSeconds()+" seconds");
		return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	private ResponseEntity<List<User>> getUsers() {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
        log.info("User Get all API called");
        stopWatch.start();
		List<User> dbUsers = userService.fetchUsers();
		stopWatch.stop();
        log.info("Total time taken by User GET All API : {}", 
        		stopWatch.getTotalTimeSeconds()+" seconds");
		return new ResponseEntity<>(dbUsers, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	private ResponseEntity<User> getUser(@PathVariable Long id){
		var stopWatch = new StopWatch(Thread.currentThread().getName());
        log.info("User Get by id API called");
        stopWatch.start();
		User user = userService.fetchUserById(id);
		stopWatch.stop();
        log.info("Total time taken by User GET BY ID API : {}", 
        		stopWatch.getTotalTimeSeconds()+" seconds");
		return ResponseEntity.ok(user);
	}
	
	@PatchMapping("/update/{id}")
	private ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDto user){
		var stopWatch = new StopWatch(Thread.currentThread().getName());
        log.info("User Updat by id API called");
        stopWatch.start();
		User updatedUserDetails = userService.updateUserDetails(id, user);
		stopWatch.stop();
        log.info("Total time taken by User UPDATE BY ID API : {}", 
        		stopWatch.getTotalTimeSeconds()+" seconds");
		return ResponseEntity.ok(updatedUserDetails);
	}
	
	@DeleteMapping("/delete/{email}")
	private ResponseEntity<String> deleteUser(@PathVariable String email){
		var stopWatch = new StopWatch(Thread.currentThread().getName());
        log.info("User Delete by email API called");
        stopWatch.start();
		String msg = userService.deleteUserDetails(email);
		stopWatch.stop();
        log.info("Total time taken by User DELETE BY EMAIL API : {}", 
        		stopWatch.getTotalTimeSeconds()+" seconds");
		return ResponseEntity.ok(msg);
	}
	
	@DeleteMapping("/delete")
	private ResponseEntity<String> deleteAll(){
		var stopWatch = new StopWatch(Thread.currentThread().getName());
        log.info("User Delete all API called");
        stopWatch.start();
		String msg = userService.deleteAllUsersData();
		stopWatch.stop();
        log.info("Total time taken by User DELETE All API : {}", 
        		stopWatch.getTotalTimeSeconds()+" seconds");
		return ResponseEntity.ok(msg);
	}
}
