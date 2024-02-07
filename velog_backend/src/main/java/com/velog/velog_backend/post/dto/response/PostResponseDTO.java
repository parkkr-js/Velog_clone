package com.velog.velog_backend.post.dto.response;

import com.velog.velog_backend.member.dto.response.MemberMinimalDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class PostResponseDTO {
        private Long postId;
        private String title;
        private String content;
        private MemberMinimalDTO member;

        private LocalDateTime modifiedAt;

        private Long likeCount;

        private Long commentCount;

        private String thumbnail;

        private List<String> tagList;
}
