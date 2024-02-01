package com.velog.velog_backend.member.domain;

import com.velog.velog_backend.common.Timestamped;
import com.velog.velog_backend.post.domain.Post;
import com.velog.velog_backend.member.dto.request.MemberRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.requireNonNullElse;

@Entity
@Table(name = "member")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", updatable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String uid;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "picture_url")
    private String pictureUrl;

    private String nickname;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @Builder
    public Member(
            String uid, String email, String pictureUrl, String nickname) {
        this.uid = uid;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.nickname = nickname;
    }


}
