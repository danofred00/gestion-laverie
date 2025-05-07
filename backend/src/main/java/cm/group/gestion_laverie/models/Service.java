package com.example.carwash.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private int dureeEstimee;
    private double tarifFixe;
    @ManyToMany(mappedBy = "services")
    private List<Order> orders;

    public Service() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TODO: Add getters and setters for all fields
}
