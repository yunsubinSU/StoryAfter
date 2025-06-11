package com.example.demo.domain.dto;

import java.time.LocalDate;

import com.example.demo.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
	private String username;
	private String password;
	private String role;

	private String email;
	private LocalDate birthDate;
	private LocalDate joinDate;
	private String profileImagePath;

	// OAUTH2 CLIENT INFO
	private String provider;
	private String providerId;

	// DTO -> Entity
	public User toEntity() {
		return User.builder()
				.username(this.username)
				.password(this.password)
				.email(this.email)
				.joinDate(this.joinDate != null ? this.joinDate : LocalDate.now()) // null 방지
				.profileImagePath(this.profileImagePath)
				.build();
	}

	// Entity -> DTO
	public static UserDto toDto(User user) {
		return UserDto.builder()
				.username(user.getUsername())
				.password(user.getPassword())
				.email(user.getEmail())
				.joinDate(user.getJoinDate())
				.profileImagePath(user.getProfileImagePath())
				.build();
	}
}
