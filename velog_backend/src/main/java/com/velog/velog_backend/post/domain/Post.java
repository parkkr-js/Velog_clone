package com.velog.velog_backend.post.domain;

import com.velog.velog_backend.comment.domain.Comment;
import com.velog.velog_backend.common.Timestamped;
import com.velog.velog_backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
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

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "content", length=3000)
    private String content;

    @Column(name = "likes")
    private Long likes;

    @Column(name = "thumbnail")
    private String thumbnail;

    @ElementCollection
    @Builder.Default
    @CollectionTable(name = "tags", joinColumns = @JoinColumn(name = "post_id"))
    private List<String> tagList = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @JoinColumn(name = "member_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public void update(String title, String content, String thumbnail, List<String> tagList) {
        this.title = title;
        this.content = content;
        this.thumbnail = thumbnail;
        this.tagList.clear(); // 기존 태그 리스트를 클리어하고 새로운 태그로 대체
        if (tagList != null) {
            this.tagList.addAll(tagList);
        }
    }
}
