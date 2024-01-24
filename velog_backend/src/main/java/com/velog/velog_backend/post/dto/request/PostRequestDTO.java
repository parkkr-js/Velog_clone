package com.velog.velog_backend.post.dto.request;

import lombok.Getter;

@Getter
public class PostRequestDTO {
    private String title;
    private String content;
    private Long userId;

}
