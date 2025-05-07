package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
