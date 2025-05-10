package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Complaint;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.ComplaintService;
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
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Complaint> complaints = service.getFiltered(filters);
        return new JsonResponse(
            "Complaints retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            complaints
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Complaint complaint = service.getById(id);
        
        if(complaint == null) {
            throw new ResourceNotFoundException("Complaint", "id", id);
        }
        
        return new JsonResponse(
            "Complaint retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            complaint
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Complaint obj) {
        Complaint created = service.save(obj);
        return new JsonResponse(
            "Complaint created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Complaint obj) {
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Complaint", "id", id);
        }
        
        Complaint updated = service.update(id, obj);
        return new JsonResponse(
            "Complaint updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Complaint", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Complaint deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
