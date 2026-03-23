package com.carrental.car.controller;

import com.carrental.car.model.Booking;
import com.carrental.car.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    /**
     * Creates a new booking for a specific car.
     * @param carId The ID of the car to book (from the URL)
     * @param bookingDetails The customer details from the form
     * @return The saved booking
     */
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/car/{carId}")
    public ResponseEntity<Booking> createBooking(
            @PathVariable Long carId,
            @RequestBody Booking bookingDetails) {

        try {
            // The service now handles all the logic
            Booking newBooking = bookingService.createBooking(carId, bookingDetails);
            return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
        } catch (RuntimeException e) {

            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}