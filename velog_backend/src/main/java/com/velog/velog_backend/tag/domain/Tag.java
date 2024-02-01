package com.velog.velog_backend.tag.domain;

import com.velog.velog_backend.common.Timestamped;
import com.velog.velog_backend.post.domain.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tags")
@Entity
public class Tag extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", updatable = false)
    private Long id;

    @Column(name = "tag_name", nullable = false)
    private String name;

    @JoinColumn(name = "post_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

}
