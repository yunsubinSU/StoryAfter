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
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	@NotBlank
	private String username;

	@NotBlank
	@Size(min = 8)
	private String password;

	private LocalDate birth;

	private LocalDate birthDate;  // 생일
	private String email;  // 이메일

	@Enumerated(EnumType.STRING)
	private Role role;

	private String profileImagePath;  // 프로필 이미지 경로
	private LocalDate joinDate;  // 가입일

	public enum Role {
		USER, ADMIN
	}
}
