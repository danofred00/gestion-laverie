package cm.group.gestion_laverie.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cm.group.gestion_laverie.models.Customer;
import cm.group.gestion_laverie.repositories.CustomerRepository;

@Service
public class CustomerService {
    
    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAll() {
        return this.customerRepository.findAll();
    }

    public Optional<Customer> find(Integer id) {
        return this.customerRepository.findById(Long.valueOf(id));
    }
}
