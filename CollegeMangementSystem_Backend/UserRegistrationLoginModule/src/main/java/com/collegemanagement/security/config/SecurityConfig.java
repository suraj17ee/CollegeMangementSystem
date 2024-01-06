package com.collegemanagement.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

////Basic Authentication(here this code block is refering to the username, password defined in application properties file)
//@Configuration
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
//        return security.csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
//                .httpBasic(Customizer.withDefaults())
//                .build();
//    }
//}
//===============================================================
//Basic Authentication with roles
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
//        return security.csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
//                .httpBasic(Customizer.withDefaults())
//                .build();
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails normalRole = User.builder()
//                .username("student")
//                .password(passwordEncoder().encode("student"))
//                .roles("STUDENT")
//                .build();
//
//        UserDetails adminRole = User.builder()
//                .username("faculty")
//                .password(passwordEncoder().encode("faculty"))
//                .roles("FACULTY")
//                .build();
//
//        return new InMemoryUserDetailsManager(normalRole, adminRole);
//    }
//}
//=====================================================================
//JWT Authentication with roles using InMemoryUserDetailsManager
@Configuration
public class SecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		UserDetails student = User.builder()
				.username("student")
				.password(passwordEncoder()
				.encode("student"))
				.roles("STUDENT").build();

		UserDetails faculty = User.builder()
				.username("faculty")
				.password(passwordEncoder()
				.encode("faculty"))
				.roles("FACULTY").build();
		
		UserDetails admin = User.builder()
				.username("admin")
				.password(passwordEncoder()
						.encode("admin"))
				.roles("ADMIN").build();
		
		UserDetails dev = User.builder()
				.username("dev")
				.password(passwordEncoder()
						.encode("dev"))
				.roles("DEV").build();

		return new InMemoryUserDetailsManager(student, faculty,admin,dev);
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
}
