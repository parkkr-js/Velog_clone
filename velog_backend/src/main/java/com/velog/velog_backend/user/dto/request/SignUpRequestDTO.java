package com.velog.velog_backend.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class SignUpRequestDTO {
    private String username;
    private String nickname;
    private String email;
    private String password;

}
