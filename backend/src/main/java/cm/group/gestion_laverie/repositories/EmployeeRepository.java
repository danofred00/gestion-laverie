package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import cm.group.gestion_laverie.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
