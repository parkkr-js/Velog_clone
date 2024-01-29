package com.velog.velog_backend.oauth;

import com.velog.velog_backend.member.domain.Member;
import com.velog.velog_backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2UserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member =
                memberRepository
                        .findByEmail(username)
                        .orElseThrow(
                                () -> new UsernameNotFoundException("Cannot find match username=" + username));
        return new OAuth2UserDetails(member);
    }
}
