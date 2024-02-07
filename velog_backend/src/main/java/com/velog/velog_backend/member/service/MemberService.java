package com.velog.velog_backend.member.service;

import com.velog.velog_backend.member.domain.Member;
import com.velog.velog_backend.member.dto.request.MemberRequest;
import com.velog.velog_backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

//    public Member updateMember(String email, MemberRequest form) {
//        Member member = memberRepository.findByEmail(email).orElseThrow();
//        member.update(form);
//
//        return member;
//    }

//    public String deleteMember(String email) {
//        memberRepository.deleteByEmail(email);
//        return "Member deleted";
//    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow();
    }


    public boolean isPresent(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        return member.isPresent();
    }

    public Member getMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow();
    }

}
