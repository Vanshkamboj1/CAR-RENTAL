package com.carrental.car.controller;

import com.carrental.car.model.Booking; // Import Booking
import com.carrental.car.model.Car;
import com.carrental.car.service.BookingService; // Import BookingService
import com.carrental.car.service.CarService;
import com.carrental.car.service.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List; // Import List

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private CarService carService;

    // --- ADD THIS ---
    @Autowired
    private BookingService bookingService;

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload");
        }
        try {
            String imageUrl = imageUploadService.uploadImage(file);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }


    /**
     * Creates a new car entry in the database.
     */
    @PostMapping("/cars")
    public ResponseEntity<Car> createCar(@RequestBody Car car) {
        Car savedCar = carService.addCar(car);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCar);
    }

    /**
     * Makes a car available again (e.g., after a rental is complete).
     * @param carId The ID of the car to make available.
     */
    @PatchMapping("/cars/{carId}/available")
    public ResponseEntity<Car> makeCarAvailable(@PathVariable Long carId) {
        try {
            Car updatedCar = carService.makeCarAvailable(carId);
            return ResponseEntity.ok(updatedCar);
        } catch (RuntimeException e) {
            // Catches the "Car not found" error
            return ResponseEntity.notFound().build();
        }
    }

    // --- NEW ENDPOINT ---
    /**
     * Gets a list of all bookings in the system.
     */
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
}