package com.carrental.car.repository;

import com.carrental.car.model.Booking;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findTopByCarIdAndStatusOrderByEndDateDesc(Long carId, String status);

    Optional<Booking> findTopByCarIdAndStatusInOrderByEndDateDesc(Long carId, List<String> statuses);

    @EntityGraph(attributePaths = {"car", "bookingDocument"})
    List<Booking> findAll();

    // ✅ NEW: get bookings of a user
    @EntityGraph(attributePaths = {"car", "bookingDocument"})
    List<Booking> findByUserId(Long userId);
}