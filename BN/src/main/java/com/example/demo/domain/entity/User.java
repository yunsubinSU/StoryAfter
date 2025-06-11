package com.example.demo.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {


	@Id
	@Column(nullable = false, length = 255)
	private String username;

	@NotBlank
	@Size(min = 8)
	private String password;

	private LocalDate birth;

	@Column(unique = true)
	private String email;

	private String profileImagePath;
	private LocalDate joinDate;

	@Enumerated(EnumType.STRING)
	private Role role;

	/* ---------- ENUM ---------- */
	public enum Role { USER, ADMIN }
}
