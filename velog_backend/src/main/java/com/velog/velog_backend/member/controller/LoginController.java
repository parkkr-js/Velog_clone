//package com.velog.velog_backend.user.controller;
//
//import com.velog.velog_backend.user.dto.request.MemberRequest;
//import com.velog.velog_backend.user.service.MemberService;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/v1/oauth")
//public class LoginController {
//
//    private final MemberService userService;
//
//    @PostMapping("/login")
//    public ResponseEntity LoginWithGoogleOauth2(@RequestBody MemberRequest requestBody, HttpServletResponse response) {
//        // Google OAuth2를 이용한 로그인을 처리하는 메서드입니다.
//
//        String authToken = userService.loginOAuthGoogle(requestBody); // Google로부터 받은 ID 토큰을 사용하여 OAuth 로그인을 수행하고, 인증 토큰을 받습니다.
//
//        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken) // 인증 토큰을 쿠키로 생성합니다.
//                .httpOnly(true) // 쿠키가 HTTP를 통해서만 접근 가능하도록 설정합니다. (자바스크립트를 통한 접근 방지)
//                .maxAge(7 * 24 * 3600) // 쿠키의 최대 수명을 설정합니다. 여기서는 7일로 설정됩니다.
//                .path("/") // 쿠키가 전송될 경로를 설정합니다. 여기서는 루트 경로로 설정됩니다.
//                .secure(false) // 쿠키가 HTTPS를 통해서만 전송되도록 할지 설정합니다. 여기서는 false로 설정되어 있습니다.
//                .build(); // ResponseCookie 객체를 빌드합니다.
//
//        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString()); // HTTP 응답 헤더에 'Set-Cookie'를 추가합니다.
//        return ResponseEntity.ok().build(); // HTTP 200 OK 응답을 생성하고, 본문은 비워서 반환합니다.
//    }
//}
