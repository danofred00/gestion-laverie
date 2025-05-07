package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
