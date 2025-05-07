package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
}
