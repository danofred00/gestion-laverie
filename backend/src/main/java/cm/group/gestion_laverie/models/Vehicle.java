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
@Table(name = "vehicles")
@Entity
@NoArgsConstructor
@AllArgsConstructor
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
    @JoinColumn(name = "client_id")
    private Client client;
    
    @OneToMany(mappedBy = "vehicle")
    private List<Order> orders;
}
