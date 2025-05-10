package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.Client;
import cm.group.gestion_laverie.models.responses.JsonResponse;
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
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<Client> clients = service.getFiltered(filters);
        return new JsonResponse(
            "Clients retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            clients
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        Client client = service.getById(id);

        if(client == null) {
            throw new ResourceNotFoundException("Client", "id", id);
        }

        return new JsonResponse(
            "Client retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            client
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody Client obj) {
        Client created = service.save(obj);
        return new JsonResponse(
            "Client created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody Client obj) {
        // Vérifier si le client existe avant la mise à jour
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Client", "id", id);
        }
        
        Client updated = service.update(id, obj);
        return new JsonResponse(
            "Client updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Vérifier si le client existe avant la suppression
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("Client", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Client deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
