package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
