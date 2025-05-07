package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
