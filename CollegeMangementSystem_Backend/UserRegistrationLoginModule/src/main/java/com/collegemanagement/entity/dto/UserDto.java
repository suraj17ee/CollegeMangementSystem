package com.collegemanagement.entity.dto;

import java.util.Set;
import lombok.Data;

@Data
public class UserDto {
	private String userName;
	private String userPassword;
	private String userEmail;
	private String userAddress;
	private Set<String> roles;
}
