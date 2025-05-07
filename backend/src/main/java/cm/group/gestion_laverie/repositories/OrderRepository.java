package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
