package com.example.demo.domain.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserSignupRequest {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{4,20}$", message = "아이디는 4~20자의 영문 또는 숫자여야 합니다.")
    private String username;

    @NotBlank
    @Pattern(regexp = "^(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$", message = "비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.")
    private String password;

    @NotNull
    @Past(message = "생년월일은 과거 날짜여야 합니다.")
    private LocalDate birth;
}
