package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Servicee;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.ServiceeService;
import java.util.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceeController {

    private final ServiceeService service;

    public ServiceeController(ServiceeService service) {
        this.service = service;
    }

    @GetMapping
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Servicee> services = service.getFiltered(filters);
        return new JsonResponse(
            "Services retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            services
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Servicee servicee = service.getById(id);
        
        if(servicee == null) {
            throw new ResourceNotFoundException("Service", "id", id);
        }
        
        return new JsonResponse(
            "Service retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            servicee
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Servicee obj) {
        Servicee created = service.save(obj);
        return new JsonResponse(
            "Service created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Servicee obj) {
        // Verify service exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Service", "id", id);
        }
        
        Servicee updated = service.update(id, obj);
        return new JsonResponse(
            "Service updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify service exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Service", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Service deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
