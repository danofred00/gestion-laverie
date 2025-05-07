package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Client;
import cm.group.gestion_laverie.repositories.ClientRepository;
import java.util.*;

@Service
public class ClientService {
    private final ClientRepository repo;

    public ClientService(ClientRepository repo) {
        this.repo = repo;
    }

    public List<Client> getAll() {
        return repo.findAll();
    }

    public Client save(Client obj) {
        return repo.save(obj);
    }

    public Client getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Client update(Long id, Client obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Client> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
