package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Review;
import cm.group.gestion_laverie.repositories.ReviewRepository;
import java.util.*;

@Service
public class ReviewService {
    private final ReviewRepository repo;

    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public List<Review> getAll() {
        return repo.findAll();
    }

    public Review save(Review obj) {
        return repo.save(obj);
    }

    public Review getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Review update(Long id, Review obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Review> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
