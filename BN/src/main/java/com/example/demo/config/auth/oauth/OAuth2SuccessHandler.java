package com.example.demo.config.auth.oauth;

import com.example.demo.domain.entity.User;
import com.example.demo.domain.entity.User.Role;
import com.example.demo.domain.Repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String registrationId = request.getRequestURI().split("/")[3];
        String username = extractUsername(oauthUser, registrationId);

        if (!userRepository.existsByUsername(username)) {
            userRepository.save(User.builder()
                    .username(username)
                    .password("oauth2user")
                    .birth(LocalDate.of(2000, 1, 1))
                    .role(Role.USER)
                    .build());
        }

        response.sendRedirect("/oauth/success?username=" + username);
    }

    private String extractUsername(OAuth2User oauthUser, String provider) {
        Map<String, Object> attr = oauthUser.getAttributes();
        if (provider.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attr.get("kakao_account");
            return (String) kakaoAccount.get("email");
        } else if (provider.equals("naver")) {
            Map<String, Object> response = (Map<String, Object>) attr.get("response");
            return (String) response.get("email");
        } else {
            return (String) attr.get("email");
        }
    }
}

