package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@Builder
@Table(name = "clients")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String prenom;
    
    private String telephone;

    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "client")
    private List<Vehicle> vehicles;

    @OneToMany(mappedBy = "client")
    private List<Order> orders;

    @OneToOne(mappedBy = "client")
    private Subscription subscription;
}
