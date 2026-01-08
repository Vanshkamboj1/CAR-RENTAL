package com.carrental.car.repository;

import com.carrental.car.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // This method allows Spring Security to find a user by their email (username)
    Optional<User> findByEmail(String email);
}