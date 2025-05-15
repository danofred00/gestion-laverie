package cm.group.gestion_laverie.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import com.fasterxml.jackson.databind.ObjectMapper;

import cm.group.gestion_laverie.controllers.ClientController;
import cm.group.gestion_laverie.models.Client;
import cm.group.gestion_laverie.repositories.ClientRepository;
import cm.group.gestion_laverie.services.ClientService;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;


@AutoConfigureMockMvc
@WebMvcTest(ClientController.class)
public class ClientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClientService clientService;

    @MockBean
    private ClientRepository clientRepository;

    @InjectMocks
    private ClientController clientController;

    private Client client;

    @BeforeEach
    public void setUp() {
        // Création d'un client fictif pour les tests
        client = new Client(1L, "Doe", "John", "123456789", "john.doe@example.com", null, null, null);
    }

    @Test
    public void testGetAllClients() throws Exception {
        Client client = Client.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .email("john.doe@example.com")
                .telephone("123456789")
                .build();
    
        when(clientService.getFiltered(anyMap())).thenReturn(List.of(client));
    
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Clients retrieved successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("OK"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].nom").value("Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data[0].prenom").value("John"));
    }
    
    @Test
    public void testGetClientById() throws Exception {
        Client client = Client.builder()
                .id(1L)
                .nom("Doe")
                .prenom("John")
                .email("john.doe@example.com")
                .telephone("123456789")
                .build();
    
        when(clientService.getById(1L)).thenReturn(client);
    
        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/{id}", 1L))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Client retrieved successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("OK"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.nom").value("Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.prenom").value("John"));
    }
    

    @Test
    public void testGetClientByIdNotFound() throws Exception {
        when(clientService.getById(1L)).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/clients/{id}", 1L))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Client not found with id: 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("NOT_FOUND"));
    }

    @Test
    public void testCreateClient() throws Exception {
        when(clientRepository.existsByEmail(anyString())).thenReturn(false);
        when(clientService.save(any(Client.class))).thenReturn(client);
    
        try {
            mockMvc.perform(MockMvcRequestBuilders.post("/api/clients")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(new ObjectMapper().writeValueAsString(client)))
                    .andExpect(MockMvcResultMatchers.status().isCreated())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Client created successfully"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("CREATED"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.data.nom").value("Doe"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.data.prenom").value("John"));
        } catch (Exception e) {
            e.printStackTrace();  // Affiche la stacktrace complète dans la console
            throw e;
        }
    }
    

    @Test
    public void testCreateClientEmailConflict() throws Exception {
        when(clientRepository.existsByEmail(client.getEmail())).thenReturn(true);
    
        mockMvc.perform(MockMvcRequestBuilders.post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(client)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Email déjà utilisé : john.doe@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("BAD_REQUEST"));
    }
    

    @Test
    public void testUpdateClient() throws Exception {
        when(clientService.getById(1L)).thenReturn(client);
        when(clientService.update(eq(1L), any(Client.class))).thenReturn(client);
    
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(client)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Client updated successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("OK"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.nom").value("Doe"));
    }
    
    @Test
    public void testUpdateClientNotFound() throws Exception {
        when(clientService.getById(1L)).thenReturn(null);
    
        mockMvc.perform(MockMvcRequestBuilders.put("/api/clients/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(client)))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Client not found with id: 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("NOT_FOUND"));
    }
    
    @Test
    public void testDeleteClient() throws Exception {
        when(clientService.getById(1L)).thenReturn(client);
        doNothing().when(clientService).delete(1L);
    
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/clients/{id}", 1L))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Client deleted successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("OK"));
    
        verify(clientService, times(1)).delete(1L);
    }
    

    @Test
    public void testDeleteClientNotFound() throws Exception {
        when(clientService.getById(1L)).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/clients/{id}", 1L))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Client not found with id: 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("NOT_FOUND"));
    }
}