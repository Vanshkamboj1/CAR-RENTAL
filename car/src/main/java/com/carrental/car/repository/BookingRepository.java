package com.carrental.car.repository;

import com.carrental.car.model.Booking;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findTopByCarIdAndStatusOrderByEndDateDesc(Long carId, String status);

    Optional<Booking> findTopByCarIdAndStatusInOrderByEndDateDesc(Long carId, List<String> statuses);

    @EntityGraph(attributePaths = {"car", "bookingDocument"})
    List<Booking> findAll();

    // ✅ NEW: get bookings of a user
    @EntityGraph(attributePaths = {"car", "bookingDocument"})
    List<Booking> findByUserId(Long userId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.car.id = :carId AND b.status IN :statuses AND b.startDate <= :endDate AND b.endDate >= :startDate AND (:excludeBookingId IS NULL OR b.id != :excludeBookingId)")
    long countOverlappingBookings(@Param("carId") Long carId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("statuses") List<String> statuses, @Param("excludeBookingId") Long excludeBookingId);
}