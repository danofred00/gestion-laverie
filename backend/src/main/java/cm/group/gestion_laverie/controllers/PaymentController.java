package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.Payment;
import com.example.carwash.services.PaymentService;
import java.util.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Payment> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public Payment getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Payment create(@RequestBody Payment obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public Payment update(@PathVariable Long id, @RequestBody Payment obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
