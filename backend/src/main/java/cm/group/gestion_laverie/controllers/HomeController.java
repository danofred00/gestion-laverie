package cm.group.gestion_laverie.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cm.group.gestion_laverie.models.responses.JsonResponse;

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("")
    public JsonResponse hello() {

        JsonResponse response = JsonResponse.builder()
            .code(200)
            .status("OK")
            .message("Hello World")
            .build();

        return response;
    }
}
