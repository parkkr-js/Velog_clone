package com.velog.velog_backend.user.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
@Builder
public class SignUpResponseDTO {

        private String firstName;

        private String lastName;

        private String email;

        public static final AccountDto convertToDto(Account account) {
                return AccountDto.builder()
                        .firstName(account.getFirstName())
                        .lastName(account.getLastName())
                        .email(account.getEmail())
                        .build();
        }

}
