package com.velog.velog_backend.member.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LogoutController {

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 성공적으로 처리되었으나, 응답할 컨텐츠가 없는 경우 204 상태 코드 반환
    public void logout(HttpServletRequest request) {
        // 세션 무효화
        var session = request.getSession(false); // 현재 세션을 가져오되, 없으면 새 세션을 생성하지 않음
        if (session != null) {
            session.invalidate(); // 세션을 무효화
        }
    }
}
