package com.mail.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
public class MailController {

	Logger logger = LoggerFactory.getLogger(MailController.class);

	@Autowired
	IMailSerivce mailService;

	@PostMapping("/send")
	public ResponseEntity<String> sendOtpEmail(@RequestParam String emailId) {
		logger.info("inside sendOtpEmail");
		String response = mailService.sendOtpEmailToUser(emailId);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}

	@PostMapping("/verify")
	public ResponseEntity<String> verifyOtp(@RequestParam String emailId, @RequestParam String otp) {
		logger.info("inside verifyOtp");
		boolean isValid = mailService.verifyOtp(emailId, otp);
		String response = isValid ? "OTP Verified Successfully!" : "Invalid OTP!";
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}

	@PostMapping("/sendmail")
	public ResponseEntity<String> sendRegistrationEmail(@RequestParam String emailId) {
		logger.info("inside sendRegistrationEmail");
		String response = mailService.sendRegistrationEmailToUser(emailId);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}

}
