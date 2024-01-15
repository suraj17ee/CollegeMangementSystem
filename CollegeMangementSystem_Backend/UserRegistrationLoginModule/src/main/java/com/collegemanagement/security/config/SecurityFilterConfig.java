package com.collegemanagement.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.collegemanagement.security.jwt.JwtAuthenticationEntryPoint;
import com.collegemanagement.security.jwt.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = false)
public class SecurityFilterConfig {
	
    private JwtAuthenticationEntryPoint point;
    
    private JwtAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
        return security
        		.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(
                		auth -> 
	                		auth.requestMatchers("/authenticate").permitAll()
	                		.requestMatchers("/v1/user").permitAll()
	                		.requestMatchers("/v1/user/update/**").hasAnyRole("STUDENT","FACULTY","ADMIN")
	                		.requestMatchers("/v1/user/delete","/v1/user/delete/**").hasRole("ADMIN")
	                		.requestMatchers(HttpMethod.GET).hasRole("ADMIN")
	                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000"); // Replace with your React app's domain
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
    
    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }
}