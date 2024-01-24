package com.velog.velog_backend.user.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
@Builder
public class SignUpResponseDTO {

        private String username;
        private String nickname;
        private String email;
        private String password;
}
