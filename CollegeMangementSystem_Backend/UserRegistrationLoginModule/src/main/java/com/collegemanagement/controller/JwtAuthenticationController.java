package com.collegemanagement.controller;

import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.collegemanagement.entity.JwtRequest;
import com.collegemanagement.entity.JwtResponse;
import com.collegemanagement.exception.UserCredenditalsException;
import com.collegemanagement.security.jwt.JwtHelper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/v1/user")
public class JwtAuthenticationController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    //validate user with database
    @PostMapping("/authenticate")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

    	log.info("calling doAuthenticate() method");
        this.doAuthenticate(request.getUsername(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = this.helper.generateToken(userDetails);

        //fetch role from user details
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        String role = authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()).get(0);
        
        JwtResponse response = JwtResponse.builder()
        		.username(userDetails.getUsername())
                .token(token)
                .userrole(role).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new UserCredenditalsException("Credentials Invalid !!");
        }

    }
}