package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CORS 설정 비활성화 (클라이언트와의 연동을 허용)
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/login",  // 로그인 엔드포인트는 인증 없이 허용
                                "/join",  // 회원가입 등
                                "/auth/**",
                                "/oauth/**",
                                "/api/movies/latest",  // 영화 API 예시
                                "/api/movies/category/**",  // 카테고리별 영화 API 예시
                                "/api/movies/**",
                                "/api/public/**"  // 공개 API
                        ).permitAll()  // 위 URL들은 모두 인증 없이 접근 허용
                        .anyRequest().authenticated()  // 그 외에는 인증이 필요
                )
                // 기본 폼 로그인 비활성화 (JWT 등으로 로그인 처리 시)
                .formLogin(form -> form.disable())
                // 기본 HTTP 기본 인증 비활성화 (추가적인 인증 방식이 있을 경우)
                .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }
}
