package com.mail.service;

public interface IMailSerivce {
	
	public String sendOtpEmailToUser(String emailId);
	
	public boolean verifyOtp(String email, String otp);
	
	public String sendRegistrationEmailToUser(String emailId);
	
}
