package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Review;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.ReviewService;
import java.util.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @GetMapping
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Review> reviews = service.getFiltered(filters);
        return new JsonResponse(
            "Reviews retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            reviews
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Review review = service.getById(id);
        
        if(review == null) {
            throw new ResourceNotFoundException("Review", "id", id);
        }
        
        return new JsonResponse(
            "Review retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            review
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Review obj) {
        Review created = service.save(obj);
        return new JsonResponse(
            "Review created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Review obj) {
        // Verify review exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Review", "id", id);
        }
        
        Review updated = service.update(id, obj);
        return new JsonResponse(
            "Review updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify review exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Review", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Review deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
