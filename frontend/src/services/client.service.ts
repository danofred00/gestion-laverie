import axios from "@/lib/axios";
import { Client, ApiResponse } from "@/types";


export type ClientsResponse = ApiResponse<Client[]>;
export type ClientResponse = ApiResponse<Client>;
export type DeleteResponse = ApiResponse<null>;

export class ClientService {
  private static BASE_URL = '/api/clients';

  /**
   * Get a single client by ID
   */
  static async get(id: number): Promise<ClientResponse> {
    const response = await axios.get<ClientResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all clients with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<ClientsResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<ClientsResponse>(url);
    return response.data;
  }

  /**
   * Create a new client
   */
  static async create(client: Client): Promise<ClientResponse> {
    const response = await axios.post<ClientResponse>(this.BASE_URL, client);
    return response.data;
  }

  /**
   * Update an existing client
   */
  static async update(id: number, client: Client): Promise<ClientResponse> {
    const response = await axios.put<ClientResponse>(`${this.BASE_URL}/${id}`, client);
    return response.data;
  }

  /**
   * Delete a client by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}