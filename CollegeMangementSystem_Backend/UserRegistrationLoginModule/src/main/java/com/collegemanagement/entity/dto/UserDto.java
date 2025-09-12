package com.collegemanagement.entity.dto;

import java.time.LocalDate;
import java.util.Set;
import lombok.Data;

@Data
public class UserDto {
	private String userName;
	private String userPassword;
	private String userEmail;
	private String userAddress;
	private String userMobile;
	private String userGender;
	private LocalDate userDob;
	private Set<String> roles;
}
