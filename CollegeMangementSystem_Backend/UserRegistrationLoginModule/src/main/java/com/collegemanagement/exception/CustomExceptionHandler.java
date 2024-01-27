package com.collegemanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
	public ResponseEntity<String> handlePersonNotFoundException(PersonNotFoundException personException) {
		return new ResponseEntity<>(personException.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
