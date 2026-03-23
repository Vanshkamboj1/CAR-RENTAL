package com.carrental.car.service;

import com.carrental.car.model.Booking;
import com.carrental.car.model.Car;
import com.carrental.car.repository.BookingRepository;
import com.carrental.car.repository.CarRepository;
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

    @Transactional
    public Booking createBooking(Long carId, Booking bookingDetails) {

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + carId));

        if (!car.isAvailable()) {
            throw new RuntimeException("Car is not available for booking");
        }

        long numberOfDays = ChronoUnit.DAYS.between(bookingDetails.getStartDate(), bookingDetails.getEndDate());


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

        carRepository.save(car);
        return bookingRepository.save(bookingDetails);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
