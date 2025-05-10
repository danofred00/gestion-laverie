package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Product;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.ProductService;
import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Product> products = service.getFiltered(filters);
        return new JsonResponse(
            "Products retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            products
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Product product = service.getById(id);
        
        if(product == null) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        
        return new JsonResponse(
            "Product retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            product
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Product obj) {
        Product created = service.save(obj);
        return new JsonResponse(
            "Product created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Product obj) {
        // Vérifier si le produit existe avant la mise à jour
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        
        Product updated = service.update(id, obj);
        return new JsonResponse(
            "Product updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Vérifier si le produit existe avant la suppression
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Product deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
