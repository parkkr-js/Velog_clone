package com.velog.velog_backend.security.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleTokenService {

    public boolean verifyToken(String accessToken) {
        String requestUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + accessToken;

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(requestUrl, String.class);

        if (response == null) {
            return false;
        }


        return true;
    }
}
