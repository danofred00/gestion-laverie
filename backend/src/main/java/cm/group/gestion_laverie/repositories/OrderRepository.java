package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
