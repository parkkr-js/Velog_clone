package com.velog.velog_backend.comment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDTO {
    private Long id;
    private Long memberId;
    private String memberName; // 또는 username, 실제로는 Member 엔티티의 이름 필드에 따름
    private Long postId;
    private String content;
    private LocalDateTime createdAt;
    private List<CommentResponseDTO> replies; // 대댓글을 위한 필드
}
