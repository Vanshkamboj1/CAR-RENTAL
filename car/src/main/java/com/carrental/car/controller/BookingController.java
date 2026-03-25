package com.carrental.car.controller;

import com.carrental.car.model.Booking;
import com.carrental.car.service.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; // ✅ added

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // ✅ CREATE BOOKING
    @PostMapping("/car/{carId}")
    public ResponseEntity<Booking> createBooking(
            @PathVariable Long carId,
            @RequestBody Booking bookingDetails,
            HttpServletRequest request
    ) {
        try {
            Booking newBooking = bookingService.createBooking(carId, bookingDetails, request);
            return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // ✅ NEW: GET USER BOOKINGS
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(HttpServletRequest request) {
        try {
            List<Booking> bookings = bookingService.getBookingsForUser(request);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}