package com.velog.velog_backend.comment.service;

import com.velog.velog_backend.comment.domain.Comment;
import com.velog.velog_backend.comment.dto.request.CommentRequestDTO;
import com.velog.velog_backend.comment.dto.response.CommentResponseDTO;
import com.velog.velog_backend.comment.repository.CommentRepository;
import com.velog.velog_backend.post.domain.Post;
import com.velog.velog_backend.post.repository.PostRepository;
import com.velog.velog_backend.user.domain.User;
import com.velog.velog_backend.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public CommentResponseDTO createComment(CommentRequestDTO requestDto) {

        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        // 게시글(Post) 존재 여부 확인
        Post post = postRepository.findById(requestDto.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        // 부모 댓글(Parent Comment) 유효성 확인
        Comment parentComment = null;
        if (requestDto.getParentId() != null) {
            parentComment = commentRepository.findById(requestDto.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글이 존재하지 않습니다."));
        }

        // 댓글 생성
        Comment comment = Comment.builder()
                .user(user)
                .content(requestDto.getContent())
                .post(post)
                .parent(parentComment) // 부모 댓글 설정
                .build();

        comment = commentRepository.save(comment);

        return CommentResponseDTO.builder()
                .username(user.getUsername())
                .commentId(comment.getId())
                .content(comment.getContent())
                .postId(post.getId())
                .parentId(parentComment != null ? parentComment.getId() : null)
                .build();
    }

}
