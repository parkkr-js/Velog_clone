//package com.velog.velog_backend.comment.controller;
//
//import com.velog.velog_backend.comment.dto.request.CommentRequestDTO;
//import com.velog.velog_backend.comment.dto.response.CommentResponseDTO;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import com.velog.velog_backend.comment.service.CommentService;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api/comment")
//public class CommentController {
//    private final CommentService commentService;
//
//    @PostMapping("/create")
//    public ResponseEntity<CommentResponseDTO> createComment(@RequestBody CommentRequestDTO requestDto) {
//        return ResponseEntity.ok(commentService.createComment(requestDto));
//    }
//
//    @DeleteMapping("/delete/{commentId}")
//    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
//        commentService.deleteComment(commentId);
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/update/{commentId}")
//    public ResponseEntity<CommentResponseDTO> updateComment(@PathVariable Long commentId, @RequestBody CommentRequestDTO requestDto) {
//        return ResponseEntity.ok(commentService.updateComment(commentId, requestDto));
//    }
//
//
//}
