package cm.group.gestion_laverie.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.*;

@Data
@Builder
@Table(name = "payments")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String methodePaiement;
    
    private LocalDateTime datePaiement;
    
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
