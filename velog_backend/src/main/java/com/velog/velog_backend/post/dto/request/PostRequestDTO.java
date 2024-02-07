package com.velog.velog_backend.post.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class PostRequestDTO {
    private String title;
    private String content;
    private Long memberId;

    private String thumbnail;

    private List<String> tagList;
}
