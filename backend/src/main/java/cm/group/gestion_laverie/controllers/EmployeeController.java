package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.Employee;
import com.example.carwash.services.EmployeeService;
import java.util.*;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Employee> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public Employee getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Employee create(@RequestBody Employee obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
