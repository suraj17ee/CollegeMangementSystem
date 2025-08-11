package com.mail.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mail.service.IMailSerivce;

@RestController
@RequestMapping("/mail")
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
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}

	@PostMapping("/sendmail")
	public ResponseEntity<String> sendRegistrationEmail(@RequestParam String emailId) {
		var stopWatch = new StopWatch(Thread.currentThread().getName());
		logger.info("inside sendRegistrationEmail");
		stopWatch.start();
		String response = mailService.sendRegistrationEmailToUser(emailId);
		stopWatch.stop();
		logger.info("Total time taken by sendRegistrationEmail API : {}", stopWatch.getTotalTimeSeconds() + " seconds");
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}

}
