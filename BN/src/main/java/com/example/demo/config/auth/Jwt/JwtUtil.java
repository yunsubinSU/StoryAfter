package com.example.demo.config.auth.Jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {

    @Value("${JWT_SECRET_KEY}")
    private String secret;

    @Value("${jwt.expiration}")
    public long expiration;

    private Key key;

    private final StringRedisTemplate redisTemplate;

    public JwtUtil(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    public void init() {
        if (secret == null || secret.length() < 32) {
            throw new IllegalArgumentException("JWT secret must be at least 256 bits long");
        }
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // 토큰 생성 메서드
    public String createToken(String username) {
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // Redis에 토큰 저장 (토큰 만료 시간 설정)
        redisTemplate.opsForValue().set(token, username, expiration, TimeUnit.MILLISECONDS);
        return token;
    }

    // 토큰에서 사용자 이름 추출
    public String getUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 토큰 검증 메서드
    public boolean validateToken(String token) {
        try {
            // JWT의 서명을 검증
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

            // Redis에서 토큰의 존재 여부도 확인
            return redisTemplate.hasKey(token);
        } catch (Exception e) {
            return false;  // 예외 발생 시 토큰 유효하지 않음
        }
    }

    // 토큰 무효화
    public void invalidateToken(String token) {
        redisTemplate.delete(token);  // Redis에서 토큰 삭제
    }
}
