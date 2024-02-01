package com.velog.velog_backend.member.repository;

import com.velog.velog_backend.member.domain.Member;
import com.velog.velog_backend.member.dto.response.MemberMinimalDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByUid(String uid);

    Optional<Member> findByNickname(String nickname);


    @Query("SELECT new com.velog.velog_backend.member.dto.response.MemberMinimalDTO(u.id, u.email, u.nickname) FROM Member u WHERE u.id = :memberId")
    MemberMinimalDTO findMinimalMemberDetailsById(Long memberId);
}