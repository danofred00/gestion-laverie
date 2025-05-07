package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.ReservationSlot;

public interface ReservationSlotRepository extends JpaRepository<ReservationSlot, Long> {
}
