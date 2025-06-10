package com.example.demo.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class SignupRequest {

    @NotBlank
    @Size(min = 8)
    @Pattern(regexp = "^(?=.*[!@#$%^&*(),.?\":{}|<>]).+$")
    private String password;

    @NotBlank
    private String username;

    @NotNull
    private LocalDate birthDate;

    @NotBlank
    private String email;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }



    public String getEmail() {
        return email;
    }

}