package cm.group.gestion_laverie.models;

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

    // TODO: Add getters and setters for all fields
}
