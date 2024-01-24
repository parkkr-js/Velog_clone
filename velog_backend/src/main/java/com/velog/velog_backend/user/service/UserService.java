package com.velog.velog_backend.user.service;

import com.velog.velog_backend.user.repository.UserRepository;
import com.velog.velog_backend.user.domain.User;
import com.velog.velog_backend.user.dto.request.SignUpRequestDTO;
import com.velog.velog_backend.user.dto.response.SignUpResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public SignUpResponseDTO createUser(SignUpRequestDTO signUpRequestDTO) {
//        log.info("signUpRequestDTO: {}", signUpRequestDTO.getPassword());
//        log.info("passwordEncoder: {}", passwordEncoder.encode(signUpRequestDTO.getPassword()));
        log.info("passwordEncoder: {}", signUpRequestDTO.getEmail());
        User user = User.builder()
                .username(signUpRequestDTO.getUsername())
                .email(signUpRequestDTO.getEmail())
                .nickname(signUpRequestDTO.getNickname())
                .password(passwordEncoder.encode(signUpRequestDTO.getPassword()))
                .build();
        log.info("user: {}", user);
        userRepository.save(user);

        return SignUpResponseDTO.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .password(user.getPassword())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
