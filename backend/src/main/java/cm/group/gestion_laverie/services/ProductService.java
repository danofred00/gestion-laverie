package com.example.carwash.services;

import org.springframework.stereotype.Service;
import com.example.carwash.models.Product;
import com.example.carwash.repositories.ProductRepository;
import java.util.*;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product save(Product obj) {
        return repo.save(obj);
    }

    public Product getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Product update(Long id, Product obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Product> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
