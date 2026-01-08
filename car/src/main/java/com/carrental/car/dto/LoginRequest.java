package com.carrental.car.dto;

// POJO for the login request JSON
public class LoginRequest {
    private String email;
    private String password;

    // Add Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}