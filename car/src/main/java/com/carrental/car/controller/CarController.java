package com.carrental.car.controller;

import com.carrental.car.model.Car;
import com.carrental.car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarService carService;

    // This endpoint gets ALL availabl
    @GetMapping("/available")
    public List<Car> getAvailableCars() {
        return carService.getAvailableCars();
    }

    // NEW: This endpoint gets available cars filtered by location
    // e.g., /api/cars/available/location?location=Delhi
    @GetMapping("/available/location")
    public List<Car> getAvailableCarsByLocation(@RequestParam String location) {
        return carService.getAvailableCarsByLocation(location);
    }

    // NEW: Check if a car is available for specific dates
    @GetMapping("/{carId}/availability")
    public boolean checkAvailability(
            @PathVariable Long carId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        java.time.LocalDate start = java.time.LocalDate.parse(startDate);
        java.time.LocalDate end = java.time.LocalDate.parse(endDate);
        return carService.isCarAvailableForDates(carId, start, end);
    }
}