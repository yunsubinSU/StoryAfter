package com.example.demo.controller;


import com.example.demo.domain.dto.SignupRequest;
import com.example.demo.domain.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest request) {
        System.out.println("회원가입 요청 데이터: " + request);
        userService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        return "로그인 성공";
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String auth) {
        String token = auth.replace("Bearer ", "");
        String username = userService.getUsername(token);
        return ResponseEntity.ok(Map.of("username", username));
    }
}
