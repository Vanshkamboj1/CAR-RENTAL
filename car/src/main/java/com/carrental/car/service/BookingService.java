package com.carrental.car.service;

import com.carrental.car.model.Booking;
import com.carrental.car.dto.BookingDTO;
import com.carrental.car.dto.CarDTO;
import com.carrental.car.model.Car;
import com.carrental.car.repository.BookingRepository;
import com.carrental.car.repository.CarRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private JwtService jwtService; // ✅ added

    @Transactional
    public BookingDTO createBooking(Long carId, Booking bookingDetails, HttpServletRequest request) {

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
        bookingDetails.setStatus("REQUESTED");
        bookingDetails.setUserId(userId);

        carRepository.save(car);
        Booking savedBooking = bookingRepository.save(bookingDetails);
        return mapToDTO(savedBooking);
    }

    @Transactional
    public BookingDTO approveBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
                
        if (!"REQUESTED".equals(booking.getStatus())) {
            throw new RuntimeException("Only REQUESTED bookings can be approved. Current status: " + booking.getStatus());
        }
        
        booking.setStatus("APPROVED");
        
        Booking savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    @Transactional
    public BookingDTO rejectBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
                
        if (!"REQUESTED".equals(booking.getStatus())) {
            throw new RuntimeException("Only REQUESTED bookings can be rejected. Current status: " + booking.getStatus());
        }
        
        booking.setStatus("REJECTED");
        
        // Free up the car since the booking was denied
        Car car = booking.getCar();
        car.setAvailable(true);
        carRepository.save(car);
        
        Booking savedBooking = bookingRepository.save(booking);
        return mapToDTO(savedBooking);
    }

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    public List<BookingDTO> getBookingsForUser(HttpServletRequest request) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid or missing token");
        }

        String token = authHeader.substring(7);

        Long userId = jwtService.extractUserId(token);

        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private BookingDTO mapToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUserId());
        dto.setFullName(booking.getFullName());
        dto.setEmail(booking.getEmail());
        dto.setPhoneNumber(booking.getPhoneNumber());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setTotalPrice(booking.getTotalPrice());
        dto.setStatus(booking.getStatus());

        if (booking.getCar() != null) {
            CarDTO carDTO = new CarDTO();
            carDTO.setId(booking.getCar().getId());
            carDTO.setName(booking.getCar().getName());
            dto.setCar(carDTO);
        }

        if (booking.getBookingDocument() != null) {
            dto.setAadharUrl(booking.getBookingDocument().getAadharUrl());
            dto.setDrivingLicenseUrl(booking.getBookingDocument().getDrivingLicenseUrl());
        }

        return dto;
    }
}