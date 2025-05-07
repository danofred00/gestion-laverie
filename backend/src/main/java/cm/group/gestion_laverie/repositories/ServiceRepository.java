package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
