package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Servicee;
import cm.group.gestion_laverie.repositories.ServiceeRepository;
import java.util.*;

@Service
public class ServiceeService {
    private final ServiceeRepository repo;

    public ServiceeService(ServiceeRepository repo) {
        this.repo = repo;
    }

    public List<Servicee> getAll() {
        return repo.findAll();
    }

    public Servicee save(Servicee obj) {
        return repo.save(obj);
    }

    public Servicee getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Servicee update(Long id, Servicee obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Servicee> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
