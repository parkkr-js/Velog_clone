package com.velog.velog_backend.security.auth.controller;

import com.velog.velog_backend.security.auth.service.GoogleTokenService;
import com.velog.velog_backend.security.jwt.utill.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final GoogleTokenService googleTokenService;

    private final JwtUtil jwtUtil;

    @PostMapping("/api/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> tokenRequest) {
        String accessToken = tokenRequest.get("accessToken");

        if (googleTokenService.verifyToken(accessToken)) {
            String jwtToken = jwtUtil.generateToken(accessToken); // subject를 accessToken으로 사용
            return ResponseEntity.ok(Map.of("jwtToken", jwtToken));
        }

        return ResponseEntity.badRequest().body("Invalid token");
    }
}
