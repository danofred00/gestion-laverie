package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
public class ReservationSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime debut;
    private boolean disponible;
    @ManyToOne
    private Client client;
    @OneToOne
    private Vehicle vehicle;

    public ReservationSlot() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TODO: Add getters and setters for all fields
}
