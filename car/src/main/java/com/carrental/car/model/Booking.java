package com.carrental.car.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "booking", indexes = {
    @Index(name = "idx_booking_status", columnList = "status"),
    @Index(name = "idx_booking_user_id", columnList = "user_id"),
    @Index(name = "idx_booking_car_id", columnList = "car_id")
})
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to Car
    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    // User details (from form)
    private String fullName;
    private String email;
    private String phoneNumber;
    private LocalDate startDate;
    private LocalDate endDate;

    // Backend fields
    private double totalPrice;
    private String status;

    // ✅ New field for user ID
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // ✅ Link to Booking Document
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "booking_document_id", referencedColumnName = "id")
    private BookingDocument bookingDocument;

    // Constructor
    public Booking() {}

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BookingDocument getBookingDocument() {
        return bookingDocument;
    }

    public void setBookingDocument(BookingDocument bookingDocument) {
        this.bookingDocument = bookingDocument;
    }
}