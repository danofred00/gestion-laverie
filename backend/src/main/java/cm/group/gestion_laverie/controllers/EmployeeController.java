package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Employee;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.EmployeeService;
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
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Employee> employees = service.getFiltered(filters);
        return new JsonResponse(
            "Employees retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            employees
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Employee employee = service.getById(id);
        
        if(employee == null) {
            throw new ResourceNotFoundException("Employee", "id", id);
        }
        
        return new JsonResponse(
            "Employee retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            employee
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Employee obj) {
        Employee created = service.save(obj);
        return new JsonResponse(
            "Employee created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Employee obj) {
        // Verify employee exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Employee", "id", id);
        }
        
        Employee updated = service.update(id, obj);
        return new JsonResponse(
            "Employee updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify employee exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Employee", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Employee deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
