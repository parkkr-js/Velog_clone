package com.velog.velog_backend.post.dto.response;

import com.velog.velog_backend.user.dto.response.UserMinimalDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CreatePostResponseDTO {
        private Long postId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private UserMinimalDTO user;
}
