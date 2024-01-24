package com.velog.velog_backend.post.service;

import com.velog.velog_backend.post.domain.Post;
import com.velog.velog_backend.post.dto.request.CreatePostRequestDTO;
import com.velog.velog_backend.post.dto.response.CreatePostResponseDTO;
import com.velog.velog_backend.post.repository.PostRepository;
import com.velog.velog_backend.user.domain.User;
import com.velog.velog_backend.user.dto.response.UserMinimalDTO;
import com.velog.velog_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CreatePostResponseDTO createPost(CreatePostRequestDTO createPostRequestDTO) {

        UserMinimalDTO user = userRepository.findMinimalUserDetailsById(createPostRequestDTO.getUserId());

        Post post = Post.builder()
                .title(createPostRequestDTO.getTitle())
                .content(createPostRequestDTO.getContent())
                .user(userRepository.findById(createPostRequestDTO.getUserId()).orElse(null))
                .build();

        post = postRepository.save(post);

        return CreatePostResponseDTO.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .user(user)
                .createdAt(post.getCreatedAt())
                .build();
    }
}
