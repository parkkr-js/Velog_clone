package com.velog.velog_backend.post.repository;

import com.velog.velog_backend.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.post.id = :postId")
    Long countCommentsByPostId(Long postId);

    List<Post> findAllByMemberId(Long memberId);

    List<Post> findByMemberIdOrderByModifiedAtDesc(Long memberId);

}
