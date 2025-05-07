package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
}
