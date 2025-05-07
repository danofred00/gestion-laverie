package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
