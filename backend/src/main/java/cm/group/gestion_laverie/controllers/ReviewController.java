package cm.group.gestion_laverie.controllers;

import org.springframework.web.bind.annotation.*;
import cm.group.gestion_laverie.models.Review;
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
    public List<Review> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{id}")
    public Review getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Review create(@RequestBody Review obj) {
        return service.save(obj);
    }

    @PutMapping("/{id}")
    public Review update(@PathVariable Long id, @RequestBody Review obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
