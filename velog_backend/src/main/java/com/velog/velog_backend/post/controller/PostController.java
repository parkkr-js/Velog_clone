package com.velog.velog_backend.post.controller;

import com.velog.velog_backend.post.dto.request.PostRequestDTO;
import com.velog.velog_backend.post.dto.response.PostResponseDTO;
import com.velog.velog_backend.post.dto.response.TagsResponseDTO;
import com.velog.velog_backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {
    private final PostService postService;

    @GetMapping("/articles")
    public ResponseEntity<Page<PostResponseDTO>> getPosts(@PageableDefault(size = 1, sort = "modifiedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<PostResponseDTO> page = postService.getPosts(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/create")
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostRequestDTO createPostRequestDTO) {
        return ResponseEntity.ok(postService.createPost(createPostRequestDTO));
    }

    @GetMapping("/articles/{postId}")
    public ResponseEntity<PostResponseDTO> getPost(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPost(postId));
    }

    @PatchMapping("/update/{postId}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long postId, @RequestBody PostRequestDTO updatePostRequestDTO) {
        return ResponseEntity.ok(postService.updatePost(postId, updatePostRequestDTO));
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tags/{memberId}")
    public ResponseEntity<TagsResponseDTO> getTags(@PathVariable Long memberId) {
        return ResponseEntity.ok(postService.getTags(memberId));
    }

    @GetMapping("/articles/member/{memberId}")
    public ResponseEntity<List<PostResponseDTO>> getPostsByMember(@PathVariable Long memberId) {
        return ResponseEntity.ok(postService.getPostsByMember(memberId));
    }
}
