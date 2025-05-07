package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
