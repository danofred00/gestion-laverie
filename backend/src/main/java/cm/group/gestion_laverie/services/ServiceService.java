package com.example.carwash.services;

import org.springframework.stereotype.Service;
import com.example.carwash.models.Service;
import com.example.carwash.repositories.ServiceRepository;
import java.util.*;

@Service
public class ServiceService {
    private final ServiceRepository repo;

    public ServiceService(ServiceRepository repo) {
        this.repo = repo;
    }

    public List<Service> getAll() {
        return repo.findAll();
    }

    public Service save(Service obj) {
        return repo.save(obj);
    }

    public Service getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Service update(Long id, Service obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Service> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
