package com.carrental.car.controller;

import com.carrental.car.model.Car;
import com.carrental.car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarService carService;

    // This endpoint gets ALL available cars
    @CrossOrigin(origins = "http://localhost:5173")
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
}