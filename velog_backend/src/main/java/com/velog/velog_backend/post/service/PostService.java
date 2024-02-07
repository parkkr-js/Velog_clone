package com.velog.velog_backend.post.service;

import com.velog.velog_backend.common.Timestamped;
import com.velog.velog_backend.post.domain.Post;
import com.velog.velog_backend.post.dto.request.PostRequestDTO;
import com.velog.velog_backend.post.dto.response.PostResponseDTO;
import com.velog.velog_backend.post.dto.response.TagsResponseDTO;
import com.velog.velog_backend.post.repository.PostRepository;
import com.velog.velog_backend.member.dto.response.MemberMinimalDTO;
import com.velog.velog_backend.member.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;
    private final MemberRepository userRepository;


    public Page<PostResponseDTO> getPosts(Pageable pageable) {
        // findAll() 메소드에 Pageable 객체를 전달하여 페이징 처리된 Post 객체 리스트를 가져옴
        Page<Post> postPage = postRepository.findAll(pageable);

        // Page<Post>를 Page<PostResponseDTO>로 변환
        List<PostResponseDTO> dtoList = postPage.getContent().stream()
                .map(post -> {
                    MemberMinimalDTO member = userRepository.findMinimalMemberDetailsById(post.getMember().getId());
                    Long commentCount = postRepository.countCommentsByPostId(post.getId());
                    return PostResponseDTO.builder()
                            .postId(post.getId())
                            .title(post.getTitle())
                            .content(post.getContent())
                            .member(member)
                            .thumbnail(post.getThumbnail())
                            .tagList(post.getTagList())
                            .modifiedAt(post.getModifiedAt())
                            .likeCount(post.getLikes())
                            .commentCount(commentCount)
                            .build();
                })
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, postPage.getTotalElements());
    }
    public PostResponseDTO createPost(PostRequestDTO postRequestDTO) {
        // Member 정보 조회
        MemberMinimalDTO member = userRepository.findMinimalMemberDetailsById(postRequestDTO.getMemberId());

        Post post = Post.builder()
                .title(postRequestDTO.getTitle()) // 특수기호가 제거된 title 사용
                .content(postRequestDTO.getContent())
                .thumbnail(postRequestDTO.getThumbnail())
                .member(userRepository.findById(postRequestDTO.getMemberId()).orElse(null))
                .tagList(postRequestDTO.getTagList())
                .likes(0L)
                .build();

        post = postRepository.save(post);
        Long commentCount = postRepository.countCommentsByPostId(post.getId());

        return PostResponseDTO.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .member(member)
                .thumbnail(post.getThumbnail())
                .tagList(post.getTagList())
                .modifiedAt(post.getModifiedAt())
                .likeCount(post.getLikes())
                .commentCount(commentCount)
                .build();
    }

    public PostResponseDTO getPost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        MemberMinimalDTO member = userRepository.findMinimalMemberDetailsById(post.getMember().getId());

        Long commentCount = postRepository.countCommentsByPostId(post.getId());

        return PostResponseDTO.builder()
                .postId(post.getId())
                .title(post.getTitle()) // 특수기호가 제거된 title 사용
                .content(post.getContent())
                .member(member)
                .thumbnail(post.getThumbnail())
                .tagList(post.getTagList())
                .modifiedAt(post.getModifiedAt())
                .likeCount(post.getLikes())
                .commentCount(commentCount)
                .build();
    }

    public PostResponseDTO updatePost(Long postId, PostRequestDTO postRequestDTO) {


        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id " + postId));

        post.update(postRequestDTO.getTitle(), postRequestDTO.getContent(), postRequestDTO.getThumbnail(), postRequestDTO.getTagList());

        Post updatedPost = postRepository.save(post);
        Long commentCount = postRepository.countCommentsByPostId(updatedPost.getId());

        return PostResponseDTO.builder()
                .postId(updatedPost.getId())
                .title(updatedPost.getTitle())
                .content(updatedPost.getContent())
                .member(userRepository.findMinimalMemberDetailsById(updatedPost.getMember().getId()))
                .thumbnail(updatedPost.getThumbnail())
                .tagList(updatedPost.getTagList())
                .modifiedAt(updatedPost.getModifiedAt())
                .likeCount(updatedPost.getLikes())
                .commentCount(commentCount)
                .build();
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    public TagsResponseDTO getTags(Long memberId) {
        List<Post> posts = postRepository.findAllByMemberId(memberId);
        List<String> tags = posts.stream()
                .flatMap(post -> post.getTagList().stream())
                .toList();

        return TagsResponseDTO.builder()
                .tagList(tags)
                .build();
    }

    public List<PostResponseDTO> getPostsByMember(Long memberId) {
        List<Post> posts = postRepository.findByMemberIdOrderByModifiedAtDesc(memberId);
        return posts.stream()
                .map(post -> {
                    MemberMinimalDTO member = userRepository.findMinimalMemberDetailsById(post.getMember().getId());
                    Long commentCount = postRepository.countCommentsByPostId(post.getId());
                    return PostResponseDTO.builder()
                            .postId(post.getId())
                            .title(post.getTitle())
                            .content(post.getContent())
                            .member(member)
                            .thumbnail(post.getThumbnail())
                            .tagList(post.getTagList())
                            .modifiedAt(post.getModifiedAt())
                            .likeCount(post.getLikes())
                            .commentCount(commentCount)
                            .build();
                })
                .toList();
    }
}
