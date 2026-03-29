package com.carrental.car.repository;

import com.carrental.car.model.BookingDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingDocumentRepository extends JpaRepository<BookingDocument, Long> {
}
