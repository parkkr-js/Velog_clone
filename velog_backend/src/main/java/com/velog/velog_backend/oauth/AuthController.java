package com.velog.velog_backend.oauth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/auth")
    public ResponseEntity<String> authorize(@AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok(user.getName());
    }
}
