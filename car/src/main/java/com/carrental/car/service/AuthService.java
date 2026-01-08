package com.carrental.car.service;

import com.carrental.car.dto.AuthResponse;
import com.carrental.car.dto.LoginRequest;
import com.carrental.car.dto.RegisterRequest;
import com.carrental.car.model.User;
import com.carrental.car.repository.UserRepository;
import com.carrental.car.service.JwtService; // Or com.carrental.car.service.JwtService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    // --- REGISTER LOGIC ---
    public AuthResponse register(RegisterRequest request) {
        // Create a new user object
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        // Hash the password before saving!
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole()); // Set the role from the request

        // Save the user to the database
        userRepository.save(user);

        // Generate a JWT token for the new user
        String token = jwtService.generateToken(user);

        // Return the token in an AuthResponse
        return new AuthResponse(token);
    }

    // --- LOGIN LOGIC ---
    public AuthResponse login(LoginRequest request) {
        // The AuthenticationManager checks if the email/password are correct
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // If authentication is successful, find the user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate a token for that user
        String token = jwtService.generateToken(user);

        // Return the token
        return new AuthResponse(token);
    }
}