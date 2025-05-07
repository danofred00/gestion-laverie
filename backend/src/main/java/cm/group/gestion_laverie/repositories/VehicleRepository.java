package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
