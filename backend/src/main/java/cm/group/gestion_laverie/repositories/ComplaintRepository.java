package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
