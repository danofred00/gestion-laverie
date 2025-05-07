package com.example.carwash.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.carwash.models.ReservationSlot;
import com.example.carwash.services.ReservationSlotService;
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
    public List<ReservationSlot> getAll(@RequestParam Map<String, String> filters) {
        return service.getFiltered(filters);
    }

    @GetMapping("/{
        id}")
    public ReservationSlot getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ReservationSlot create(@RequestBody ReservationSlot obj) {
        return service.save(obj);
    }

    @PutMapping("/{
        id}")
    public ReservationSlot update(@PathVariable Long id, @RequestBody ReservationSlot obj) {
        return service.update(id, obj);
    }

    @DeleteMapping("/{
        id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
