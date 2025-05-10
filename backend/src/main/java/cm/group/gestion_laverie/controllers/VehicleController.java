package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Vehicle;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.VehicleService;
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
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Vehicle> vehicles = service.getFiltered(filters);
        return new JsonResponse(
            "Vehicles retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            vehicles
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Vehicle vehicle = service.getById(id);
        
        if(vehicle == null) {
            throw new ResourceNotFoundException("Vehicle", "id", id);
        }
        
        return new JsonResponse(
            "Vehicle retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            vehicle
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Vehicle obj) {
        Vehicle created = service.save(obj);
        return new JsonResponse(
            "Vehicle created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Vehicle obj) {
        // Verify vehicle exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Vehicle", "id", id);
        }
        
        Vehicle updated = service.update(id, obj);
        return new JsonResponse(
            "Vehicle updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify vehicle exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Vehicle", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Vehicle deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
