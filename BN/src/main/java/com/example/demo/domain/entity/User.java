package com.example.demo.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {

	@Id
	private String username;

	private String password;

	private String role;

	@Column(nullable = false, unique = true)
	private String email;

	private LocalDate birthDate;

	private LocalDate joinDate;

	private String profileImagePath;
}
