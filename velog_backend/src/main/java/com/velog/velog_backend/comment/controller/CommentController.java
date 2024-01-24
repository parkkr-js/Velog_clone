package com.velog.velog_backend.comment.controller;

import com.velog.velog_backend.comment.dto.request.CommentRequestDTO;
import com.velog.velog_backend.comment.dto.response.CommentResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.velog.velog_backend.comment.service.CommentService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<CommentResponseDTO> createComment(@RequestBody CommentRequestDTO requestDto) {
        return ResponseEntity.ok(commentService.createComment(requestDto));
    }


}
