package com.velog.velog_backend.member.dto.response;

import com.velog.velog_backend.member.domain.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberResponse {

    private String nickname;

    public MemberResponse(Member member) {
        this.nickname = member.getNickname();

    }

}
