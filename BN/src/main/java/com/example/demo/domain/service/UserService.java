package com.example.demo.domain.service;

//import com.example.demo.config.auth.Jwt.JwtUtil;
import com.example.demo.config.auth.Jwt.JwtUtil;
import com.example.demo.controller.LoginRequest;
import com.example.demo.domain.dto.SignupRequest;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(SignupRequest request) {
        // username의 첫 글자는 소문자로 시작하는 것이 맞습니다.
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("중복된 아이디입니다.");
        }

        // 비밀번호를 암호화
        String encodedPw = passwordEncoder.encode(request.getPassword());

        // 사용자 엔티티 객체 생성
        User user = User.builder()
                .username(request.getUsername())
                .password(encodedPw)
                .email(request.getEmail())
                .birth(request.getBirthDate())
                .role(User.Role.USER)
                .build();

        // 사용자 저장
        userRepository.save(user);
    }


    public String login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호 불일치");
        }

        return jwtUtil.createToken(user.getUsername());
    }

    public String getUsername(String token) {
        return jwtUtil.getUsername(token);
    }
}

