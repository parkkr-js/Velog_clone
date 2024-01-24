package com.velog.velog_backend.post.service;

import com.velog.velog_backend.post.domain.Post;
import com.velog.velog_backend.post.dto.request.PostRequestDTO;
import com.velog.velog_backend.post.dto.response.PostResponseDTO;
import com.velog.velog_backend.post.repository.PostRepository;
import com.velog.velog_backend.user.dto.response.UserMinimalDTO;
import com.velog.velog_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostResponseDTO createPost(PostRequestDTO postRequestDTO) {

        UserMinimalDTO user = userRepository.findMinimalUserDetailsById(postRequestDTO.getUserId());

        Post post = Post.builder()
                .title(postRequestDTO.getTitle())
                .content(postRequestDTO.getContent())
                .user(userRepository.findById(postRequestDTO.getUserId()).orElse(null))
                .build();

        post = postRepository.save(post);

        return PostResponseDTO.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .user(user)
                .build();
    }
}
