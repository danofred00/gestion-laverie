package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.*;

@Data
@Builder
@Table(name = "subscriptions")
@Entity
@NoArgsConstructor
@AllArgsConstructor
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
}
