package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Subscription;
import cm.group.gestion_laverie.repositories.SubscriptionRepository;
import java.util.*;

@Service
public class SubscriptionService {
    private final SubscriptionRepository repo;

    public SubscriptionService(SubscriptionRepository repo) {
        this.repo = repo;
    }

    public List<Subscription> getAll() {
        return repo.findAll();
    }

    public Subscription save(Subscription obj) {
        return repo.save(obj);
    }

    public Subscription getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Subscription update(Long id, Subscription obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Subscription> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
