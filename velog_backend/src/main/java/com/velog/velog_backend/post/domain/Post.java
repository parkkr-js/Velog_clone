package com.velog.velog_backend.post.domain;

import com.velog.velog_backend.comment.domain.Comment;
import com.velog.velog_backend.common.Timestamped;
//import com.velog.velog_backend.post.dto.request.PostRequestDTO;
import com.velog.velog_backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "posts")
@Entity
public class Post extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id", updatable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content",  nullable = false)
    private String content;

    @Column(name = "likes")
    private Long likes;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @JoinColumn(name = "member_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

//    public void update(PostRequestDTO postRequestDto) {
//        this.title = postRequestDto.getTitle();
//        this.content = postRequestDto.getContent();
//    }
//
//    public boolean validateMember(Member member) {
//
//        return !this.member.equals(member);
//    }

}
