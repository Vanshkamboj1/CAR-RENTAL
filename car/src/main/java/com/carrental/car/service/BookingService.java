package com.carrental.car.service;

import com.carrental.car.model.Booking;
import com.carrental.car.model.Car;
import com.carrental.car.repository.BookingRepository;
import com.carrental.car.repository.CarRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private JwtService jwtService; // ✅ added

    @Transactional
    public Booking createBooking(Long carId, Booking bookingDetails, HttpServletRequest request) {

        // ✅ Extract token
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);


        Long userId = jwtService.extractUserId(token);

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + carId));

        if (!car.isAvailable()) {
            throw new RuntimeException("Car is not available for booking");
        }

        long numberOfDays = ChronoUnit.DAYS.between(
                bookingDetails.getStartDate(),
                bookingDetails.getEndDate()
        );

        if (numberOfDays < 0) {
            throw new RuntimeException("End date must be after start date");
        } else if (numberOfDays == 0) {
            numberOfDays = 1;
        }

        double totalPrice = numberOfDays * car.getPrice();

        car.setAvailable(false);
        bookingDetails.setCar(car);
        bookingDetails.setTotalPrice(totalPrice);
        bookingDetails.setStatus("CONFIRMED");
        bookingDetails.setUserId(userId);

        carRepository.save(car);
        return bookingRepository.save(bookingDetails);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    public List<Booking> getBookingsForUser(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid or missing token");
        }

        String token = authHeader.substring(7);

        Long userId = jwtService.extractUserId(token);

        return bookingRepository.findByUserId(userId);
    }
}