package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
