package cm.group.gestion_laverie.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import cm.group.gestion_laverie.exceptions.ResourceNotFoundException;
import cm.group.gestion_laverie.models.ReservationSlot;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.ReservationSlotService;
import java.util.*;

@RestController
@RequestMapping("/api/reservationslots")
@CrossOrigin(origins = "*")
public class ReservationSlotController {

    private final ReservationSlotService service;

    public ReservationSlotController(ReservationSlotService service) {
        this.service = service;
    }

    @GetMapping
    public JsonResponse getAll(@RequestParam Map<String, String> filters) {
        List<ReservationSlot> slots = service.getFiltered(filters);
        return new JsonResponse(
            "Reservation slots retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            slots
        );
    }

    @GetMapping("/{id}")
    public JsonResponse getById(@PathVariable Long id) {
        ReservationSlot slot = service.getById(id);
        
        if(slot == null) {
            throw new ResourceNotFoundException("ReservationSlot", "id", id);
        }
        
        return new JsonResponse(
            "Reservation slot retrieved successfully", 
            HttpStatus.OK.value(),
            "OK",
            slot
        );
    }

    @PostMapping
    public JsonResponse create(@RequestBody ReservationSlot obj) {
        ReservationSlot created = service.save(obj);
        return new JsonResponse(
            "Reservation slot created successfully", 
            HttpStatus.CREATED.value(),
            "CREATED",
            created
        );
    }

    @PutMapping("/{id}")
    public JsonResponse update(@PathVariable Long id, @RequestBody ReservationSlot obj) {
        // Verify reservation slot exists before updating
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("ReservationSlot", "id", id);
        }
        
        ReservationSlot updated = service.update(id, obj);
        return new JsonResponse(
            "Reservation slot updated successfully", 
            HttpStatus.OK.value(),
            "OK",
            updated
        );
    }

    @DeleteMapping("/{id}")
    public JsonResponse delete(@PathVariable Long id) {
        // Verify reservation slot exists before deleting
        if(service.getById(id) == null) {
            throw new ResourceNotFoundException("ReservationSlot", "id", id);
        }
        
        service.delete(id);
        return new JsonResponse(
            "Reservation slot deleted successfully", 
            HttpStatus.OK.value(),
            "OK",
            null
        );
    }
}
