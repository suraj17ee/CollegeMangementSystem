package com.collegemanagement.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.collegemanagement.repository.UserDataRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserDataRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			return userRepo.findByUserEmail(username).orElseThrow(()->new Exception("invalid username/email: "+username));
		} catch (Exception e) {
			log.error("invalid username/email: "+username);
			e.printStackTrace();
		}
		return null;
	}

}
