package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Vehicle;
import cm.group.gestion_laverie.repositories.VehicleRepository;
import java.util.*;

@Service
public class VehicleService {
    private final VehicleRepository repo;

    public VehicleService(VehicleRepository repo) {
        this.repo = repo;
    }

    public List<Vehicle> getAll() {
        return repo.findAll();
    }

    public Vehicle save(Vehicle obj) {
        return repo.save(obj);
    }

    public Vehicle getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Vehicle update(Long id, Vehicle obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Vehicle> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
