package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Complaint;
import cm.group.gestion_laverie.repositories.ComplaintRepository;
import java.util.*;

@Service
public class ComplaintService {
    private final ComplaintRepository repo;

    public ComplaintService(ComplaintRepository repo) {
        this.repo = repo;
    }

    public List<Complaint> getAll() {
        return repo.findAll();
    }

    public Complaint save(Complaint obj) {
        return repo.save(obj);
    }

    public Complaint getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Complaint update(Long id, Complaint obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Complaint> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
