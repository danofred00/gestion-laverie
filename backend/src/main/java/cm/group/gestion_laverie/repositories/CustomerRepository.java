package cm.group.gestion_laverie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cm.group.gestion_laverie.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> 
{
    // All methods should been implemented here
}
