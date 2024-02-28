package com.collegemanagement.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.collegemanagement.security.jwt.JwtAuthenticationEntryPoint;
import com.collegemanagement.security.jwt.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = false)
public class SecurityFilterConfig {
	
    private JwtAuthenticationEntryPoint point;
    
    private JwtAuthenticationFilter filter;

    private SecurityConfig securityConfig;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
        return security
        		.csrf(csrf -> csrf.disable())
//                .cors(cors -> cors.disable()) // while connecting backend app with frontend react app this cors has to be enable, for that reason it should be commented out
                .authorizeHttpRequests(
                		auth -> 
	                		auth.requestMatchers("/v1/user/authenticate").permitAll()
	                		.requestMatchers("/v1/user/signup").permitAll()
	                		.requestMatchers("/v1/user/update/**","/v1/user/get/**").hasAnyRole("USER","ADMIN")
	                		.requestMatchers("/v1/user/delete","/v1/user/delete/**","/v1/user/all").hasRole("ADMIN")
	                		.requestMatchers(HttpMethod.GET).hasRole("ADMIN")
	                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(securityConfig.daoAuthenticationProvider())//for authentication using database we have to add this line
                .build();
    }
}