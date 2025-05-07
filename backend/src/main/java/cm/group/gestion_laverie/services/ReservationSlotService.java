package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.ReservationSlot;
import cm.group.gestion_laverie.repositories.ReservationSlotRepository;
import java.util.*;

@Service
public class ReservationSlotService {
    private final ReservationSlotRepository repo;

    public ReservationSlotService(ReservationSlotRepository repo) {
        this.repo = repo;
    }

    public List<ReservationSlot> getAll() {
        return repo.findAll();
    }

    public ReservationSlot save(ReservationSlot obj) {
        return repo.save(obj);
    }

    public ReservationSlot getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public ReservationSlot update(Long id, ReservationSlot obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<ReservationSlot> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
