package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Payment;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.PaymentService;
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
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Payment> payments = service.getFiltered(filters);
        return new JsonResponse(
            "Payments retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            payments
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Payment payment = service.getById(id);
        
        if(payment == null) {
            throw new ResourceNotFoundException("Payment", "id", id);
        }
        
        return new JsonResponse(
            "Payment retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            payment
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Payment obj) {
        Payment created = service.save(obj);
        return new JsonResponse(
            "Payment created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Payment obj) {
        // Verify payment exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Payment", "id", id);
        }
        
        Payment updated = service.update(id, obj);
        return new JsonResponse(
            "Payment updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify payment exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Payment", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Payment deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
