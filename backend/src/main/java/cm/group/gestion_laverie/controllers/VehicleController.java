package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.Vehicle;
import com.example.carwash.services.VehicleService;
import java.util.*;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleService service;

    public VehicleController(VehicleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Vehicle> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public Vehicle getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Vehicle create(@RequestBody Vehicle obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public Vehicle update(@PathVariable Long id, @RequestBody Vehicle obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
