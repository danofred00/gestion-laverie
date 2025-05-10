package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Data
@Builder
@Table(name = "services")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Servicee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    
    private int dureeEstimee;
    
    private double tarifFixe;
    
    @ManyToMany(mappedBy = "services")
    private List<Order> orders;
}
