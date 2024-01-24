package com.velog.velog_backend.user.controller;

import com.velog.velog_backend.user.dto.request.SignUpRequestDTO;
import com.velog.velog_backend.user.dto.response.SignUpResponseDTO;
import com.velog.velog_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDTO> createUser(@RequestBody SignUpRequestDTO signUpRequestDTO) {
        return ResponseEntity.ok(userService.createUser(signUpRequestDTO));
    }

}
