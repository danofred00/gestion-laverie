package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@Table(name = "complaints")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    
    private String statut;
    
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
