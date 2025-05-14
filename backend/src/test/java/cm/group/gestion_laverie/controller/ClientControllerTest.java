package cm.group.gestion_laverie.controller;
import com.fasterxml.jackson.databind.ObjectMapper;

import cm.group.gestion_laverie.controllers.ClientController;
import cm.group.gestion_laverie.models.Client;
import cm.group.gestion_laverie.repositories.ClientRepository;
import cm.group.gestion_laverie.services.ClientService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ClientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ClientService clientService;

    @Mock
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientController clientController;

    private Client client;

    @BeforeEach
    public void setUp() {
        // Création d'un client fictif pour les tests
        client = new Client(1L, "Doe", "John", "123456789", "john.doe@example.com", null, null, null);
    }

    // Test de la création d'un client
    @Test
    public void testCreateClient() throws Exception {
        // Simuler que l'email n'existe pas déjà
        when(clientRepository.existsByEmail(anyString())).thenReturn(false);
        
        // Simuler le comportement de 'save' pour retourner un client
        when(clientService.save(any(Client.class))).thenReturn(client);

        mockMvc.perform(post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(client))) // Convertir l'objet en JSON
                .andExpect(status().isCreated()) // Vérifier que le code HTTP 201 est renvoyé
                .andExpect(jsonPath("$.message").value("Client created successfully")) // Vérification du message
                .andExpect(jsonPath("$.status").value("CREATED")) // Vérification du statut
                .andExpect(jsonPath("$.data.nom").value("Doe")) // Vérifier le nom dans la réponse
                .andExpect(jsonPath("$.data.prenom").value("John")); // Vérifier le prénom dans la réponse
    }

    // Test de la vérification du duplicat de la clé primaire (email déjà utilisé)
    @Test
    public void testCreateClientWithDuplicateEmail() throws Exception {
        // Simuler qu'un email est déjà utilisé
        when(clientRepository.existsByEmail(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(client)))
                .andExpect(status().isConflict()) // Vérifier le code HTTP 409 (Conflit)
                .andExpect(jsonPath("$.message").value("Email déjà utilisé : " + client.getEmail())) // Vérifier le message
                .andExpect(jsonPath("$.status").value("CONFLICT")); // Vérifier le statut
    }
}
