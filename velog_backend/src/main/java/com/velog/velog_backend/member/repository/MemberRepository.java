package com.velog.velog_backend.member.repository;

import com.velog.velog_backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByUid(String uid);

    Optional<Member> findByNickname(String nickname);

    void deleteByEmail(String email);

//    Optional<Member> findByRefreshToken(String refreshToken);
//    @Query("SELECT new com.velog.velog_backend.member.dto.response.UserMinimalDTO(u.id, u.username, u.nickname) FROM Member u WHERE u.id = :userId")
//    UserMinimalDTO findMinimalUserDetailsById(Long userId);
}