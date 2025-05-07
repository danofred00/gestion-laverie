package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.Product;
import com.example.carwash.services.ProductService;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<Product> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public Product getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Product create(@RequestBody Product obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public Product update(@PathVariable Long id, @RequestBody Product obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
