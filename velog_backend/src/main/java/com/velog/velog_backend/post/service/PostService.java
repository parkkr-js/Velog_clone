package com.velog.velog_backend.post.service;

import com.velog.velog_backend.post.domain.Post;
import com.velog.velog_backend.post.dto.request.PostRequestDTO;
import com.velog.velog_backend.post.dto.response.PostResponseDTO;
import com.velog.velog_backend.post.repository.PostRepository;
import com.velog.velog_backend.member.dto.response.MemberMinimalDTO;
import com.velog.velog_backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;
    private final MemberRepository userRepository;

    public PostResponseDTO createPost(PostRequestDTO postRequestDTO) {

        MemberMinimalDTO member = userRepository.findMinimalMemberDetailsById(postRequestDTO.getMemberId());

        Post post = Post.builder()
                .title(postRequestDTO.getTitle())
                .content(postRequestDTO.getContent())
                .member(userRepository.findById(postRequestDTO.getMemberId()).orElse(null))
                .build();

        post = postRepository.save(post);

        return PostResponseDTO.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .member(member)
                .build();
    }
}
