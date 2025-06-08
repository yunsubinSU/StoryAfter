package com.example.demo.config.auth.logoutHandler;



import com.example.demo.config.auth.PrincipalDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CustomLogoutHandler implements LogoutHandler {


	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
	
		log.info("CustomLogoutHandler's logout invoke");
	
		PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();
		String provider = principalDetails.getUserDto().getProvider();
	
		if(provider != null) {
			if(provider.startsWith("kakao")){
				log.info("Kakao user logout process start");
				// 카카오 로그아웃 추가 처리 가능
			}else if(provider.startsWith("naver")){
				log.info("Naver user logout process start");
				// 네이버 로그아웃 추가 처리 가능
			}else if(provider.startsWith("google")){
				log.info("Google user logout process start");
				// 구글 로그아웃 추가 처리 가능
			}else {
				log.info("Other provider logout");
			}
		}else{
			log.info("Provider info is null");
		}
	
		// 세션 무효화 (필수)
		HttpSession session =  request.getSession(false);
		if(session != null) {
			session.invalidate();
			log.info("Session invalidated");
		}
	}
	

}
