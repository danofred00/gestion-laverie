package com.example.carwash.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateHeure;
    private double montantTotal;
    private String statut;
    private boolean surPlace;
    @ManyToOne
    private Client client;
    @ManyToOne
    private Vehicle vehicle;
    @ManyToMany
    private List<Service> services;
    @OneToOne(mappedBy = "order")
    private Payment payment;

    public Order() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TODO: Add getters and setters for all fields
}
