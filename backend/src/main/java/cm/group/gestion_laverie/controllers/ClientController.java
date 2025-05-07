package cm.group.gestion_laverie.controllers;

import org.springframework.web.bind.annotation.*;
import cm.group.gestion_laverie.models.Client;
import cm.group.gestion_laverie.services.ClientService;
import java.util.*;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    private final ClientService service;

    public ClientController(ClientService service) {
        this.service = service;
    }

    @GetMapping
    public List<Client> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{id}")
    public Client getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Client create(@RequestBody Client obj) {
        return service.save(obj);
    }

    @PutMapping("/{id}")
    public Client update(@PathVariable Long id, @RequestBody Client obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
