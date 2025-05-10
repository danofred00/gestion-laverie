package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Subscription;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.SubscriptionService;
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
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Subscription> subscriptions = service.getFiltered(filters);
        return new JsonResponse(
            "Subscriptions retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            subscriptions
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Subscription subscription = service.getById(id);
        
        if(subscription == null) {
            throw new ResourceNotFoundException("Subscription", "id", id);
        }
        
        return new JsonResponse(
            "Subscription retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            subscription
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Subscription obj) {
        Subscription created = service.save(obj);
        return new JsonResponse(
            "Subscription created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Subscription obj) {
        // Verify subscription exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Subscription", "id", id);
        }
        
        Subscription updated = service.update(id, obj);
        return new JsonResponse(
            "Subscription updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify subscription exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Subscription", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Subscription deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
