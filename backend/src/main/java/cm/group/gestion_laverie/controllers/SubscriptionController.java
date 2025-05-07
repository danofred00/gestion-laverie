package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.Subscription;
import com.example.carwash.services.SubscriptionService;
import java.util.*;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "*")
public class SubscriptionController {

    private final SubscriptionService service;

    public SubscriptionController(SubscriptionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Subscription> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public Subscription getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Subscription create(@RequestBody Subscription obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public Subscription update(@PathVariable Long id, @RequestBody Subscription obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
