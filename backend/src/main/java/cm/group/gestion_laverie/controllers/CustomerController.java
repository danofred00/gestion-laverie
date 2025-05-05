package cm.group.gestion_laverie.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cm.group.gestion_laverie.models.Customer;
import cm.group.gestion_laverie.models.responses.JsonResponse;
import cm.group.gestion_laverie.services.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController
{
    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService){
        this.customerService = customerService;
    }

    @GetMapping("")
    public JsonResponse index() {

        List<Customer> customers = this.customerService.getAll();
        JsonResponse response = JsonResponse.builder()
            .data(customers)
            .message("Customer Retrieved with success")
            .build();

        return response;
    }


    @GetMapping("/{id}")
    public JsonResponse get(@PathVariable Integer id){
        Optional<Customer> customer = this.customerService.find(id);

        if(!customer.isPresent()) {
            return new JsonResponse(
                "Customer Not Found", 
                HttpStatus.NOT_FOUND.value(), 
                "NOT_FOUND", 
                null
            );
        }

        return JsonResponse.builder().data(customer).build();
    }

}
