package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String poste;
    private int heuresTravaillees;

    public Employee() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TODO: Add getters and setters for all fields
}
