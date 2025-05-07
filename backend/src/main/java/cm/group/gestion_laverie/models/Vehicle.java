package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String plaque;
    private String marque;
    private String modele;
    private String categorie;
    private LocalDate dateEnregistrement;
    @ManyToOne
    private Client client;
    @OneToMany(mappedBy = "vehicle")
    private List<Order> orders;

    public Vehicle() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TODO: Add getters and setters for all fields
}
