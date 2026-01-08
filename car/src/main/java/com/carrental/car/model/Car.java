package com.carrental.car.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "Honda City"
    private String imageUrl; // e.g., "HondaCity.png"
    private double price; // e.g., 1800.0
    private String location; // e.g., "Delhi"
    private boolean available;

    // --- Constructors ---
    public Car() {
    }

    public Car(String name, String imageUrl, double price, String location, boolean available) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.location = location;
        this.available = available;
    }

    // --- Getters and Setters ---
    // (Generate these in your IDE)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}