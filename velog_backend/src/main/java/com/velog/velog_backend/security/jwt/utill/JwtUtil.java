package com.velog.velog_backend.security.jwt.utill;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.secret_key}")
    private String secretKey;

    public String generateToken(String subject) {
        return Jwts.builder()
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setSubject(subject)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }
}

