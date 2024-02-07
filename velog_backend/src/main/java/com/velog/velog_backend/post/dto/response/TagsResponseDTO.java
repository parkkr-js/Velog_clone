package com.velog.velog_backend.post.dto.response;

import com.velog.velog_backend.member.dto.response.MemberMinimalDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class TagsResponseDTO {
    private List<String> tagList;
}

