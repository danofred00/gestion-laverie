package cm.group.gestion_laverie.controllers;

import org.springframework.web.bind.annotation.*;
import cm.group.gestion_laverie.models.Servicee;
import cm.group.gestion_laverie.services.ServiceeService;
import java.util.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceeController {

    private final ServiceeService service;

    public ServiceeController(ServiceeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Servicee> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{id}")
    public Servicee getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Servicee create(@RequestBody Servicee obj) {
        return service.save(obj);
    }

    @PutMapping("/{id}")
    public Servicee update(@PathVariable Long id, @RequestBody Servicee obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
