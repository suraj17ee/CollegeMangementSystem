package com.collegemanagement.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.collegemanagement.entity.User;
import com.collegemanagement.entity.dao.UserDao;
import com.collegemanagement.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping
	private ResponseEntity<User> saveUser(@RequestBody UserDao user) {
		User registeredUser = userService.registerUser(user);
		return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	private ResponseEntity<List<User>> getUsers() {
		List<User> dbUsers = userService.fetchUsers();
		return new ResponseEntity<>(dbUsers, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	private ResponseEntity<User> getUser(@PathVariable Long id){
		User user = userService.fetchUserById(id);
		return ResponseEntity.ok(user);
	}
	
	@PatchMapping("/update/{id}")
	private ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDao user){
		User updatedUserDetails = userService.updateUserDetails(id, user);
		return ResponseEntity.ok(updatedUserDetails);
	}
	
	@DeleteMapping("/delete/{email}")
	private ResponseEntity<String> deleteUser(@PathVariable String email){
		String msg = userService.deleteUserDetails(email);
		return ResponseEntity.ok(msg);
	}
}
