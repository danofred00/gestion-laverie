package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
