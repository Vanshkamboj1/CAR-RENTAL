package com.carrental.car.repository;

import com.carrental.car.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // Import this

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // --- ADD THIS METHOD ---
    /**
     * Finds the most recent "CONFIRMED" booking for a specific car.
     * We'll assume this is the booking we want to complete.
     */
    Optional<Booking> findTopByCarIdAndStatusOrderByEndDateDesc(Long carId, String status);
}