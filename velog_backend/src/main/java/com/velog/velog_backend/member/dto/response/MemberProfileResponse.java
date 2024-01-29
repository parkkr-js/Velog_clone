package com.velog.velog_backend.member.dto.response;

import com.velog.velog_backend.member.domain.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class MemberProfileResponse {

    public MemberProfileResponse(Member member) {
        this.profile = new MemberResponse(member);

//        this.posts =
//                member.getPosts().stream()
//                        .filter(post -> post.getArchive() == null)
//                        .map(post -> post.toResponse(member.getEmail()))
//                        .collect(Collectors.toList());
//
//        this.likes =
//                member.getLikes().stream()
//                        .map(liked -> liked.getPost().toResponse(member.getEmail()))
//                        .collect(Collectors.toList());
//
//        this.archives =
//                member.getArchives().stream()
//                        .map(archive -> archive.getPost().toResponse(member.getEmail()))
//                        .collect(Collectors.toList());
    }

    private final MemberResponse profile;
//    private final List<PostReadOneResponse> posts;
//    private final List<PostReadOneResponse> likes;
//    private final List<PostReadOneResponse> archives;
}
