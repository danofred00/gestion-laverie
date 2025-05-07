package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.Complaint;
import com.example.carwash.services.ComplaintService;
import java.util.*;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(ComplaintService service) {
        this.service = service;
    }

    @GetMapping
    public List<Complaint> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public Complaint getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Complaint create(@RequestBody Complaint obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public Complaint update(@PathVariable Long id, @RequestBody Complaint obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
