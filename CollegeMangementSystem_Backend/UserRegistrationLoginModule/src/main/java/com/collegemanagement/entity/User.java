package com.collegemanagement.entity;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//for basic authentication and inmemory authentocation
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Setter
//@Getter
//@ToString
//@Table(name = "userdata")
//public class User {
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "custom-sequence")
//	@GenericGenerator(name = "custom-sequence", strategy = "com.collegemanagement.entity.CustomIdGenerator")
//	private String userId;
//	private String userName;
//	private String userPassword;
//	private String userEmail;
//	private String userAddress;
//	private String userMobile;
//	private String userGender;
//	@Temporal(TemporalType.DATE)
//	private String userDob;
//
////	using element roles collection 
//	@ElementCollection
//	@CollectionTable(name = "rolestab", joinColumns = @JoinColumn(name = "userId")) // in roles table "id-column" will
//																					// be reffered from main table
//																					// primary key i.e. "userId"
//	@Column(name = "role") // for extra column with roles in roles table
//	private Set<String> roles;
//}
//=================================================================
//for user authentication using database
@Entity
@NoArgsConstructor
@Setter
@Getter
@ToString
@Table(name = "userdata")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "custom-sequence")
	@GenericGenerator(name = "custom-sequence", strategy = "com.collegemanagement.entity.CustomIdGenerator")
	private String userId;
	private String userName;
	@JsonIgnore
	private String userPassword;
	private String userEmail;
	private String userAddress;
	private String userMobile;
	private String userGender;
	@Temporal(TemporalType.DATE)
	private String userDob;

//	using element roles collection 
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "rolestab", joinColumns = @JoinColumn(name = "userId")) // in roles table "id-column" will
	// be reffered from main table
	// primary key i.e. "userId"
	@Column(name = "role") // for extra column with roles in roles table
	private Set<String> roles;
	
	public String getUserName() {
		return this.userName;
	}
	
	//spring security UserDetails methods
	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = this.roles.stream().map(role -> new SimpleGrantedAuthority(role))
				.collect(Collectors.toList());
		return authorities;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return this.userPassword;
	}

	@JsonIgnore
	@Override
	public String getUsername() {
		return this.userEmail;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
