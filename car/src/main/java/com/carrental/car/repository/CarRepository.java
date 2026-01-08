package com.carrental.car.repository;

import com.carrental.car.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    // Finds all cars where 'available' is true
    List<Car> findByAvailableTrue();

    // NEW: Finds all cars in a specific location that are also available
    List<Car> findByLocationAndAvailableTrue(String location);
}