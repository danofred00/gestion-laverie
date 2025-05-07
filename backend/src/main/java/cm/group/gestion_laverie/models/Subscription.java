package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private double tarif;
    private int maxLavages;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    @OneToOne
    @JoinColumn(name = "client_id")
    private Client client;

    public Subscription() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TODO: Add getters and setters for all fields
}
