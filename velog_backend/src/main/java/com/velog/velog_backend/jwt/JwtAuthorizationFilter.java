package com.velog.velog_backend.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private static final String BEARER = "Bearer ";
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        Optional<String> token = extractToken(request);
        jwtService
                .validate(token)
                .ifPresent(
                        claims -> {
                            OAuth2User principal = getPrincipal(claims);
                            Authentication authn = new OAuth2AuthenticationToken(principal, null, "google");

                            SecurityContextHolder.getContext().setAuthentication(authn);
                        });
        filterChain.doFilter(request, response);
    }

    private Optional<String> extractToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .filter(value -> value.startsWith(BEARER))
                .map(value -> value.substring(BEARER.length()));
    }

    private DefaultOAuth2User getPrincipal(Claims claims) {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", claims.getSubject());

        return new DefaultOAuth2User(null, attributes, "email");
    }
}