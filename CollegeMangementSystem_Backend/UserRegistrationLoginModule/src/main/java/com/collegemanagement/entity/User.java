package com.collegemanagement.entity;

import java.util.Date;
import java.util.Set;
import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
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

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Table(name = "userdata")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "custom-sequence")
	@GenericGenerator(name = "custom-sequence", strategy = "com.collegemanagement.entity.CustomIdGenerator")
	private String userId;
	private String userName;
	private String userPassword;
	private String userEmail;
	private String userAddress;
	private String userMobile;
	private String userGender;
	@Temporal(TemporalType.DATE)
	private String userDob;

//	using element roles collection 
	@ElementCollection
	@CollectionTable(name = "rolestab", joinColumns = @JoinColumn(name = "userId")) // in roles table "id-column" will
																					// be reffered from main table
																					// primary key i.e. "userId"
	@Column(name = "role") // for extra column with roles in roles table
	private Set<String> roles;
}
