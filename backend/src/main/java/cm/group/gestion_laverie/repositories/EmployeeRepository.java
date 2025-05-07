package com.example.carwash.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carwash.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
