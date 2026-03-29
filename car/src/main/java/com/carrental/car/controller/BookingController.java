package com.carrental.car.controller;

import com.carrental.car.model.Booking;
import com.carrental.car.dto.BookingDTO;
import com.carrental.car.service.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.carrental.car.service.ImageUploadService;

import java.util.List; // ✅ added

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private ImageUploadService imageUploadService;

    // ✅ NEW: UPLOAD DOCUMENT
    @PostMapping("/upload-document")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = imageUploadService.uploadImage(file);
            return new ResponseEntity<>(imageUrl, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Log error for debugging
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ CREATE BOOKING
    @PostMapping("/car/{carId}")
    public ResponseEntity<BookingDTO> createBooking(
            @PathVariable Long carId,
            @RequestBody Booking bookingDetails,
            HttpServletRequest request
    ) {
        try {
            BookingDTO newBooking = bookingService.createBooking(carId, bookingDetails, request);
            return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // ✅ NEW: GET USER BOOKINGS
    @GetMapping("/my")
    public ResponseEntity<List<BookingDTO>> getMyBookings(HttpServletRequest request) {
        try {
            List<BookingDTO> bookings = bookingService.getBookingsForUser(request);
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}