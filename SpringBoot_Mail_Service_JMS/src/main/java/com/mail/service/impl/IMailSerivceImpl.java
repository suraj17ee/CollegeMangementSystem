package com.mail.service.impl;

import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.mail.controller.MailController;
import com.mail.service.IMailSerivce;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class IMailSerivceImpl implements IMailSerivce {

	Logger logger = LoggerFactory.getLogger(IMailSerivceImpl.class);

	@Value("${spring.mail.username}")
	private String senderEmail;

	@Value("${spring.mail.password}")
	private String senderPwd;

	@Autowired
	private JavaMailSender mailSender;

	private final Map<String, String> otpStore = new HashMap<>();

	public String generateOtp() {
		SecureRandom random = new SecureRandom();
		int otp = 100000 + random.nextInt(900000);
		return String.valueOf(otp);
	}

	@Override
	public String sendOtpEmailToUser(String emailId) {
		logger.info("preparing email to send to customer");
		try {
			String otp = generateOtp();
			otpStore.put(emailId, otp);
			// create SimpleMailMessage
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(senderEmail);
			message.setTo(emailId);
			message.setSubject("Your OTP code");
			message.setSentDate(new Date());
			String username = emailId.substring(0, emailId.indexOf("@"));
			message.setText("Hi " + username + ", your OTP is: " + otp + "\nValid for 5 minutes.");
			mailSender.send(message);
			logger.info("Email sent successfully to " + username);
			return "Email sent successfully";
		} catch (Exception e) {
			logger.error("Exception occured while sending email:{}", e.getMessage());
		}
		return "Currently not able to send email";
	}

	// Verify OTP
	public boolean verifyOtp(String email, String otp) {
		String storedOtp = otpStore.get(email);
		if (storedOtp != null && storedOtp.equals(otp)) {
			otpStore.remove(email); // Optional: clear after successful verification
			logger.info("OTP verified successfully");
			return true;
		}
		logger.info("Invalid OTP provided");
		return false;
	}

	@Override
	public String sendRegistrationEmailToUser(String emailId) {
		logger.info("preparing registration email to send to customer");
		try {
			// create Mimemessage
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
			helper.setFrom(senderEmail);
			helper.setTo(emailId);
			helper.setSubject("Your OTP code");
			helper.setSentDate(new Date());
			String username = emailId.substring(0, emailId.indexOf("@"));
			helper.setText(username + " you have been registered successfully!");
			helper.addAttachment("Thankyou.jpg", new ClassPathResource("Thankyou.jpg"));
			mailSender.send(mimeMessage);
			logger.info("Registration email sent successfully to " + username);
			return "Registration email sent successfully";
		} catch (MessagingException e) {
			logger.error("Exception occured while sending registration email:{}", e.getMessage());
		}
		return "Currently not able to send email";
	}

}
