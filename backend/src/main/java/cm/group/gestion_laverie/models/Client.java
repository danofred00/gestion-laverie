package com.example.carwash.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String telephone;
    private String email;
    @OneToMany(mappedBy = "client")
    private List<Vehicle> vehicles;
    @OneToMany(mappedBy = "client")
    private List<Order> orders;
    @OneToOne(mappedBy = "client")
    private Subscription subscription;

    public Client() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getPrenom() {
        return prenom;
    }
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    public String getTelephone() {
        return telephone;
    }
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public List<Vehicle> getVehicles() {
        return vehicles;
    }
    public void setVehicles(List<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }
    public List<Order> getOrders() {
        return orders;
    }
    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
    public Subscription getSubscription() {
        return subscription;
    }
    public void setSubscription(Subscription subscription) {
        this.subscription = subscription;
    }
    public void addVehicle(Vehicle vehicle) {
        if (this.vehicles == null) {
            this.vehicles = new ArrayList<>();
        }
        this.vehicles.add(vehicle);
        vehicle.setClient(this);
    }
    public void removeVehicle(Vehicle vehicle) {
        if (this.vehicles != null) {
            this.vehicles.remove(vehicle);
            vehicle.setClient(null);
        }
    }
    public void addOrder(Order order) {
        if (this.orders == null) {
            this.orders = new ArrayList<>();
        }
        this.orders.add(order);
        order.setClient(this);
    }
    public void removeOrder(Order order) {
        if (this.orders != null) {
            this.orders.remove(order);
            order.setClient(null);
        }
    }
}
