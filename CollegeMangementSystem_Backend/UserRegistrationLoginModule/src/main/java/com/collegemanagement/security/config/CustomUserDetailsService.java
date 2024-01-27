package com.collegemanagement.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.collegemanagement.exception.PersonNotFoundException;
import com.collegemanagement.repository.UserDataRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDataRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("security loadUserByUsername() called !!");
		return userRepo.findByUserEmail(username)
				.orElseThrow(() -> new PersonNotFoundException("invalid username/email: " + username));
	}

}
