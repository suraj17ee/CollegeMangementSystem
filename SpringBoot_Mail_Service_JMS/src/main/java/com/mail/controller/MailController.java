package com.mail.controller;

import com.mail.Entity.RegistrationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;
import com.mail.service.IMailSerivce;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = {"http://localhost:3000", "http://54.92.176.47:8002"})
public class MailController {

	Logger logger = LoggerFactory.getLogger(MailController.class);

	@Autowired
	IMailSerivce mailService;

	@PostMapping("/send")
	public ResponseEntity<String> sendOtpEmail(@RequestParam String emailId) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		logger.info("inside sendOtpEmail");
		stopWatch.start();
		String response = mailService.sendOtpEmailToUser(emailId);
		stopWatch.stop();
		logger.info("Total time taken by sendOtpEmail API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}

	@PostMapping("/verify")
	public ResponseEntity<String> verifyOtp(@RequestParam String emailId, @RequestParam String otp) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		logger.info("inside verifyOtp");
		stopWatch.start();
		boolean isValid = mailService.verifyOtp(emailId, otp);
		String response = isValid ? "OTP Verified Successfully!" : "Invalid OTP!";
		stopWatch.stop();
		logger.info("Total time taken by verifyOtp API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		if(isValid==true){
			return new ResponseEntity<String>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(response, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/sendmail")
	public ResponseEntity<String> sendRegistrationEmail(@RequestBody RegistrationRequest request) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		logger.info("inside sendRegistrationEmail");
		stopWatch.start();
		String response = mailService.sendRegistrationEmailToUser(request);
		stopWatch.stop();
		logger.info("Total time taken by sendRegistrationEmail API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}

}
