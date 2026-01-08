package com.carrental.car.dto;

// POJO for the JSON we send back *after* a successful login/register
public class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    // Add Getter and Setter
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}