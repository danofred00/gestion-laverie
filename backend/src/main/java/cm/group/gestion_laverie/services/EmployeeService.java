package cm.group.gestion_laverie.services;

import org.springframework.stereotype.Service;
import cm.group.gestion_laverie.models.Employee;
import cm.group.gestion_laverie.repositories.EmployeeRepository;
import java.util.*;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> getAll() {
        return repo.findAll();
    }

    public Employee save(Employee obj) {
        return repo.save(obj);
    }

    public Employee getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Employee update(Long id, Employee obj) {
        obj.setId(id);
        return repo.save(obj);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Employee> getFiltered(Map<String, String> filters) {
        // TODO: Add filtering logic based on filters map
        return repo.findAll();
    }
}
