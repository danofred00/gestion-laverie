package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.ReservationSlot;

public interface ReservationSlotRepository extends JpaRepository<ReservationSlot, Long> {
}
