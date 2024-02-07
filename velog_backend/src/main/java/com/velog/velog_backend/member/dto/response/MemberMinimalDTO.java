package com.velog.velog_backend.member.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberMinimalDTO {
    private Long memberId;
    private String nickname;
    private String profileImage;
}
