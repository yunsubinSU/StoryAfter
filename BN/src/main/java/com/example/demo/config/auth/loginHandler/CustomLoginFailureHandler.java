package com.example.demo.config.auth.loginHandler;

import java.io.IOException;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
// 로그인 실패 후 어떻게 동작할지 정의
public class CustomLoginFailureHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

		log.error("CustomLoginFailureHandler's onAuthenticationFailure invoke..") ;
		response.sendRedirect(request.getContextPath()+"/login?error="+exception.getMessage());
	}



}
