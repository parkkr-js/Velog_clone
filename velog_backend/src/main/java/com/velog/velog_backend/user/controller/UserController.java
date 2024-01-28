package com.velog.velog_backend.user.controller;

import com.velog.velog_backend.user.domain.User;
import com.velog.velog_backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import static com.velog.velog_backend.user.dto.response.UserResponseDTO.convertToDto;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/oauth")
public class UserController {

    private final UserService userService;

    @GetMapping("/user/info")
    public ResponseEntity getUserInfo(Principal principal) {
        User user = userService.getUser(Long.valueOf(principal.getName()));
        return ResponseEntity.ok().body(convertToDto(user));
    }

}
