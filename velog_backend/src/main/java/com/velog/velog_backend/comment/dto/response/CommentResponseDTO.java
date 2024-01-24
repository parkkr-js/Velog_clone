package com.velog.velog_backend.comment.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponseDTO {
    private Long commentId;
    private String content;
    private Long postId;
    private Long parentId;
    private String username;
}
