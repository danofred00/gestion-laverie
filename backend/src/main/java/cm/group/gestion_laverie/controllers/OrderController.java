package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Order;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.OrderService;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Order> orders = service.getFiltered(filters);
        return new JsonResponse(
            "Orders retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            orders
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Order order = service.getById(id);
        
        if(order == null) {
            throw new ResourceNotFoundException("Order", "id", id);
        }
        
        return new JsonResponse(
            "Order retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            order
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Order obj) {
        Order created = service.save(obj);
        return new JsonResponse(
            "Order created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Order obj) {
        // Verify order exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Order", "id", id);
        }
        
        Order updated = service.update(id, obj);
        return new JsonResponse(
            "Order updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify order exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Order", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Order deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
