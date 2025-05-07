package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String statut;
    @ManyToOne
    private Client client;

    public Complaint() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TODO: Add getters and setters for all fields
}
