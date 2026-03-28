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
    
    // New fields
    private String registrationNumber;
    private int seatingCapacity;
    private String bootSpace;
    private String fuelEfficiency;
    private String drivePreferences;
    private int modelYear;

    // --- Constructors ---
    public Car() {
    }

    public Car(String name, String imageUrl, double price, String location, boolean available,
               String registrationNumber, int seatingCapacity, String bootSpace, 
               String fuelEfficiency, String drivePreferences, int modelYear) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.location = location;
        this.available = available;
        this.registrationNumber = registrationNumber;
        this.seatingCapacity = seatingCapacity;
        this.bootSpace = bootSpace;
        this.fuelEfficiency = fuelEfficiency;
        this.drivePreferences = drivePreferences;
        this.modelYear = modelYear;
    }

    // --- Getters and Setters ---
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
    
    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }
    
    public int getSeatingCapacity() { return seatingCapacity; }
    public void setSeatingCapacity(int seatingCapacity) { this.seatingCapacity = seatingCapacity; }
    
    public String getBootSpace() { return bootSpace; }
    public void setBootSpace(String bootSpace) { this.bootSpace = bootSpace; }
    
    public String getFuelEfficiency() { return fuelEfficiency; }
    public void setFuelEfficiency(String fuelEfficiency) { this.fuelEfficiency = fuelEfficiency; }
    
    public String getDrivePreferences() { return drivePreferences; }
    public void setDrivePreferences(String drivePreferences) { this.drivePreferences = drivePreferences; }
    
    public int getModelYear() { return modelYear; }
    public void setModelYear(int modelYear) { this.modelYear = modelYear; }
}