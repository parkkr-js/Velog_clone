package com.velog.velog_backend.post.dto.response;


import com.velog.velog_backend.member.domain.Member;
import com.velog.velog_backend.member.dto.response.MemberMinimalDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostResponseDTO {
        private Long postId;
        private String title;
        private String content;
        private MemberMinimalDTO member;
}
