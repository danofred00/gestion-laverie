package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.Service;
import com.example.carwash.services.ServiceService;
import java.util.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    private final ServiceService service;

    public ServiceController(ServiceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Service> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public Service getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Service create(@RequestBody Service obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public Service update(@PathVariable Long id, @RequestBody Service obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
