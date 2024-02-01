package com.velog.velog_backend.oauth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthDTO {
    private String name;
    private String email;
    private String profileImgUrl;
}
