package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
