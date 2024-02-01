package com.velog.velog_backend.post.controller;

import com.velog.velog_backend.post.dto.request.PostRequestDTO;
import com.velog.velog_backend.post.dto.response.PostResponseDTO;
import com.velog.velog_backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostRequestDTO createPostRequestDTO) {
        return ResponseEntity.ok(postService.createPost(createPostRequestDTO));
    }
}
