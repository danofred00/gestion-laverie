package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.*;

@Data
@Builder
@Table(name = "reservation_slots")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ReservationSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime debut;
    
    private boolean disponible;
    
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    
    @OneToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}
