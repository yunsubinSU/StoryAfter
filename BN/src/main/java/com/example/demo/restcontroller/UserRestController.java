package com.example.demo.restcontroller;

import com.example.demo.config.auth.jwt.JwtProperties;
import com.example.demo.config.auth.jwt.JwtTokenProvider;
import com.example.demo.config.auth.jwt.TokenInfo;
import com.example.demo.config.auth.redis.RedisUtil;
import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.repository.JwtTokenRepository;
import com.example.demo.domain.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@RestController
@Slf4j
public class UserRestController {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenRepository jwtTokenRepository;
    @Autowired private JwtTokenProvider jwtTokenProvider;
    @Autowired private RedisUtil redisUtil;

    /* -----------------------------------------------------------
     *  1) 회원 가입
     * ----------------------------------------------------------- */
    @PostMapping(value = "/join", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> join(@RequestBody UserDto userDto) {   // ★ 메서드명·파라미터 정리
        log.info("POST /join ... {}", userDto);

        /* 1) 아이디 중복 체크 (선택) -------------------------------- */
        if (userRepository.findById(userDto.getUsername()).isPresent()) { // ★ 중복 방지
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("이미 사용 중인 아이디입니다.");
        }

        /* 2) DTO → Entity ---------------------------------------- */
        User user = User.builder()
                .username(userDto.getUsername())                       // ★ dto 변수명 수정
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(Optional.ofNullable(userDto.getRole())
                        .orElse("ROLE_USER"))
                .email(userDto.getEmail())                             // ★ 신규 필드
                .birthDate(userDto.getBirthDate())                     // ★ 신규 필드
                .joinDate(LocalDate.now())                             // ★ 자동 가입일
                .profileImagePath(Optional.ofNullable(
                                userDto.getProfileImagePath())
                        .orElse("/uploads/default.jpg"))               // ★ 기본 이미지
                .build();

        /* 3) 저장 -------------------------------------------------- */
        userRepository.save(user);

        return ResponseEntity.ok("success");
    }

    /* -----------------------------------------------------------
     *  2) 로그인
     * ----------------------------------------------------------- */
    @PostMapping(value = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto userDto,
                                                     HttpServletResponse resp) throws IOException {

        log.info("POST /login ... {}", userDto);
        Map<String, Object> response = new HashMap<>();

        try {
            /* 2-1. 인증(ID/PW) */
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    userDto.getUsername(), userDto.getPassword()));

            /* 2-2. 토큰 발급 */
            TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

            /* 2-3. Redis 에 Refresh 토큰 저장 */
            redisUtil.save("RT:" + authentication.getName(),
                    tokenInfo.getRefreshToken());

            /* 2-4. 쿠키 세팅 */
            Cookie accessCookie =
                    new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME,
                            tokenInfo.getAccessToken());
            accessCookie.setHttpOnly(true);
            accessCookie.setSecure(false); // HTTPS 환경이면 true 권장
            accessCookie.setPath("/");
            accessCookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);

            Cookie userCookie = new Cookie("username", authentication.getName());
            userCookie.setHttpOnly(true);
            userCookie.setSecure(false);   // ★ 변수명 수정 (기존 오타)
            userCookie.setPath("/");
            userCookie.setMaxAge(JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME);

            resp.addCookie(accessCookie);
            resp.addCookie(userCookie);

            /* 2-5. 응답 JSON */
            response.put("state", "success");
            response.put("message", "인증 성공!");
            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            log.warn("로그인 실패: {}", e.getMessage());
            response.put("state", "fail");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }

    /* -----------------------------------------------------------
     *  3) 내 정보 조회
     * ----------------------------------------------------------- */
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> user(Authentication authentication) {
        log.info("GET /user ... {}", authentication);

        return userRepository.findById(authentication.getName())
                .map(u -> {
                    Map<String, Object> res = new HashMap<>();
                    res.put("username", u.getUsername());
                    res.put("role", u.getRole());
                    res.put("email", u.getEmail());                 // ★ 응답에 이메일 포함
                    res.put("birthDate", u.getBirthDate());         // ★ 응답에 생일 포함
                    res.put("profileImagePath", u.getProfileImagePath());
                    return ResponseEntity.ok(res);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(null));
    }

    /* -----------------------------------------------------------
     *  4) 토큰 유효성 체크 (프론트 “로그인 유지”용)
     * ----------------------------------------------------------- */
    @GetMapping("/validate")
    public ResponseEntity<String> validateToken() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isAnon = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ANONYMOUS"));

        return (auth.isAuthenticated() && !isAnon)
                ? ResponseEntity.ok("")
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("");
    }
}
