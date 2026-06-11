package com.carrental.car.service;

import com.carrental.car.model.Booking; // Import Booking
import com.carrental.car.model.Car;
import com.carrental.car.repository.BookingRepository; // Import BookingRepository
import com.carrental.car.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import Transactional

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    // --- ADD THIS ---
    @Autowired
    private BookingRepository bookingRepository;

    public List<Car> getAvailableCars() {
        return carRepository.findByAvailableTrue();
    }

    public List<Car> getAvailableCarsByLocation(String location) {
        return carRepository.findByLocationAndAvailableTrue(location);
    }

    /**
     * Saves a new car to the database.
     * @param car The Car object to be saved (will include the Cloudinary URL)
     * @return The saved car with its new ID.
     */
    public Car addCar(Car car) {
        // You can add validation logic here if needed
        return carRepository.save(car);
    }

    public boolean isCarAvailableForDates(Long carId, LocalDate startDate, LocalDate endDate) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        
        if (!car.isAvailable()) {
            return false;
        }

        long overlaps = bookingRepository.countOverlappingBookings(
                carId, startDate, endDate, Arrays.asList("APPROVED", "CONFIRMED", "REQUESTED"), null
        );
        
        return overlaps == 0;
    }

    // --- THIS METHOD IS UPDATED ---
    /**
     * Makes a car available again AND completes the associated booking.
     * @param carId The ID of the car to make available.
     * @return The updated Car object.
     */
    @Transactional // Ensures booking is updated
    public Car makeCarAvailable(Long carId) {
        // 1. Find the car
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + carId));

        // Note: We no longer toggle car.setAvailable(true/false) per booking.
        // It remains true unless globally deactivated.

        // 3. Find and update the booking
        // This finds the most recent booking for this car that is "CONFIRMED" or "APPROVED"
        bookingRepository.findTopByCarIdAndStatusInOrderByEndDateDesc(carId, Arrays.asList("CONFIRMED", "APPROVED"))
                .ifPresent(booking -> {
                    booking.setStatus("COMPLETED");
                    bookingRepository.save(booking);
                });

        // 4. Save and return the updated car
        return carRepository.save(car);
    }
}