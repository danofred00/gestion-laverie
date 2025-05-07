package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
