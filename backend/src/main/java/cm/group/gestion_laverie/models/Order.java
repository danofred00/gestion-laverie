package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.*;
import java.util.*;

@Data
@Builder
@Table(name = "orders")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateHeure;
    
    private double montantTotal;
    
    private String statut;
    
    private boolean surPlace;
    
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
    
    @ManyToMany
    @JoinTable(
        name = "order_service",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<Servicee> services;
    
    @OneToOne(mappedBy = "order")
    private Payment payment;
}
