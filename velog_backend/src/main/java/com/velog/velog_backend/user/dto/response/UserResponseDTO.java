package com.velog.velog_backend.user.dto.response;

import com.velog.velog_backend.user.domain.User;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {

        private String firstName;

        private String lastName;

        private String email;

        public static final UserResponseDTO convertToDto(User user) {
                return UserResponseDTO.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .build();
        }

}
