package cm.group.gestion_laverie.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

    boolean existsByEmail(String email);

    // (optionnel) si vous voulez récupérer un client par email
    Optional<Client> findByEmail(String email);
}
