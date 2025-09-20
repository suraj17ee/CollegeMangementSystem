package com.mail.service;

import com.mail.Entity.RegistrationRequest;

public interface IMailSerivce {
	
	public String sendOtpEmailToUser(String emailId);
	
	public boolean verifyOtp(String email, String otp);
	
	public String sendRegistrationEmailToUser(RegistrationRequest request);
	
}
