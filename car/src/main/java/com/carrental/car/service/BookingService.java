package com.carrental.car.service;

import com.carrental.car.model.Booking;
import com.carrental.car.model.Car;
import com.carrental.car.repository.BookingRepository;
import com.carrental.car.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List; // Import java.util.List

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository; // You must inject this

    @Transactional // This ensures both operations (saving car & booking) succeed or fail together
    public Booking createBooking(Long carId, Booking bookingDetails) {

        // 1. Find the car
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + carId));

        // 2. Check availability
        if (!car.isAvailable()) {
            throw new RuntimeException("Car is not available for booking");
        }

        // 3. Calculate total price
        long numberOfDays = ChronoUnit.DAYS.between(bookingDetails.getStartDate(), bookingDetails.getEndDate());
        if (numberOfDays <= 0) {
            throw new RuntimeException("End date must be after start date");
        }
        double totalPrice = numberOfDays * car.getPrice();

        // 4. Update car and booking objects

        // --- THIS IS THE KEY ---
        car.setAvailable(false); // Make the car unavailable
        // -----------------------

        bookingDetails.setCar(car); // Link the car to the booking
        bookingDetails.setTotalPrice(totalPrice); // Set the calculated price
        bookingDetails.setStatus("CONFIRMED"); // Set the initial status

        // 5. Save changes
        carRepository.save(car); // Save the updated car (now unavailable)
        return bookingRepository.save(bookingDetails); // Save the new booking
    }

    // --- NEW METHOD ---
    /**
     * Retrieves all bookings from the database.
     * @return A list of all Booking objects.
     */
    public List<Booking> getAllBookings() {
        // findAll() is a built-in method from JpaRepository
        return bookingRepository.findAll();
    }
}