package com.example.carwash.services;

import org.springframework.stereotype.Service;
import com.example.carwash.models.Order;
import com.example.carwash.repositories.OrderRepository;
import java.util.*;

@Service
public class OrderService {
    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public List<Order> getAll() {
        return repo.findAll();
    }

    public Order save(Order obj) {
        return repo.save(obj);
    }

    public Order getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Order update(Long id, Order obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Order> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
