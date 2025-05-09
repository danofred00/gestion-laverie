package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Payment;
import cm.group.gestion_laverie.repositories.PaymentRepository;
import java.util.*;

@Service
public class PaymentService {
    private final PaymentRepository repo;

    public PaymentService(PaymentRepository repo) {
        this.repo = repo;
    }

    public List<Payment> getAll() {
        return repo.findAll();
    }

    public Payment save(Payment obj) {
        return repo.save(obj);
    }

    public Payment getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Payment update(Long id, Payment obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Payment> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
