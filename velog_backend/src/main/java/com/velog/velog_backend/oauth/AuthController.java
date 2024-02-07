package com.velog.velog_backend.oauth;

import com.velog.velog_backend.member.domain.Member;
import com.velog.velog_backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.http.ResponseEntity;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @GetMapping("/api/userinfo")
    public ResponseEntity<AuthDTO> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Member member = memberService.findByEmail(principal.getAttribute("email"));

        AuthDTO authDTO = AuthDTO.builder()
                .memberId(member.getId())
                .name(principal.getAttribute("name"))
                .email(principal.getAttribute("email"))
                .profileImgUrl(principal.getAttribute("picture"))
                .build();

        return ResponseEntity.ok(authDTO);
    }
}

