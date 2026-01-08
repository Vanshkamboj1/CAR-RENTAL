package com.carrental.car.dto;

import com.carrental.car.model.Role;

// This class is a "Plain Old Java Object" (POJO)
// We use it to map the incoming JSON from a register request
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private Role role; // The frontend will send USER or ADMIN

    // Add Getters and Setters for all fields
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}