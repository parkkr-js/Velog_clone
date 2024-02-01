package com.velog.velog_backend.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberMinimalDTO {
    private Long id;
    private String name;
    private String nickname;
}
