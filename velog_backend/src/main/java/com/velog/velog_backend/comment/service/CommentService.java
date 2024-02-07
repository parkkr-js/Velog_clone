//package com.velog.velog_backend.comment.service;
//
//import com.velog.velog_backend.comment.domain.Comment;
//import com.velog.velog_backend.comment.dto.request.CommentRequestDTO;
//import com.velog.velog_backend.comment.dto.response.CommentResponseDTO;
//import com.velog.velog_backend.comment.repository.CommentRepository;
//import com.velog.velog_backend.post.domain.Post;
//import com.velog.velog_backend.post.repository.PostRepository;
//import com.velog.velog_backend.member.domain.Member;
//import com.velog.velog_backend.member.repository.MemberRepository;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//
//@RequiredArgsConstructor
//@Service
//public class CommentService {
//
//    private final CommentRepository commentRepository;
//    private final PostRepository postRepository;
//    private final MemberRepository userRepository;
//
//    @Transactional
//    public CommentResponseDTO createComment(CommentRequestDTO requestDto) {
//        Post post = postRepository.findById(requestDto.getPostId())
//                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
//        Member member = memberRepository.findById(requestDto.getMemberId())
//                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
//        Comment parent = null;
//        if (requestDto.getParentId() != null) {
//            parent = commentRepository.findById(requestDto.getParentId())
//                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
//        }
//
//        Comment comment = Comment.builder()
//                .member(member)
//                .post(post)
//                .content(requestDto.getContent())
//                .parent(parent)
//                .build();
//        Comment savedComment = commentRepository.save(comment);
//
//        return new CommentResponseDTO(
//                savedComment.getId(),
//                member.getId(),
//                member.getName(), // 가정: Member 엔티티에 getName() 메서드가 있다고 가정
//                post.getId(),
//                savedComment.getContent(),
//                savedComment.getCreatedAt(),
//                new ArrayList<>() // 초기 대댓글 리스트는 비어있음
//        );
//    }
//
//
//    @Transactional
//    public void deleteComment(Long commentId) {
//        Comment comment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
//        commentRepository.delete(comment);
//        // 자식 댓글도 삭제되도록, JPA의 CascadeType.REMOVE 또는 orphanRemoval=true 옵션을 활용
//    }
//
//
//    @Transactional
//    public CommentResponseDTO updateComment(Long commentId, CommentRequestDTO requestDto) {
//        Comment comment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
//        comment.updateContent(requestDto.getContent()); // Comment 엔티티 내에 내용을 업데이트하는 메소드 추가 필요
//
//        return new CommentResponseDTO(
//                comment.getId(),
//                comment.getMember().getId(),
//                comment.getMember().getName(),
//                comment.getPost().getId(),
//                comment.getContent(),
//                comment.getCreatedAt(),
//                new ArrayList<>() // 대댓글 업데이트 로직은 별도로 구현
//        );
//    }
//
//
//    public CommentResponseDTO getComment(Long commentId) {}
//
//    public CommentResponseDTO getCommentsByPostId(Long postId) {}
//
//    public CommentResponseDTO getCommentsByPostId(Long postId) {}
//
//}
