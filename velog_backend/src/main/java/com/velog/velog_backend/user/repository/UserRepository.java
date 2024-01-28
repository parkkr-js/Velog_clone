package com.velog.velog_backend.user.repository;

import com.velog.velog_backend.user.domain.User;
import com.velog.velog_backend.user.dto.response.UserMinimalDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
//    Optional<User> findByRefreshToken(String refreshToken);
//    @Query("SELECT new com.velog.velog_backend.user.dto.response.UserMinimalDTO(u.id, u.username, u.nickname) FROM User u WHERE u.id = :userId")
//    UserMinimalDTO findMinimalUserDetailsById(Long userId);
}