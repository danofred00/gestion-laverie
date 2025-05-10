import axios from "@/lib/axios";
import { ApiResponse, Service } from "@/types";

// Define specific response types
type ServiceResponse = ApiResponse<Service>;
type ServicesResponse = ApiResponse<Service[]>;
type DeleteResponse = ApiResponse<null>;

export class ServiceService {
  private static BASE_URL = '/api/services';

  /**
   * Get a single service by ID
   */
  static async get(id: number): Promise<ServiceResponse> {
    const response = await axios.get<ServiceResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all services with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<ServicesResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<ServicesResponse>(url);
    return response.data;
  }

  /**
   * Create a new service
   */
  static async create(service: Service): Promise<ServiceResponse> {
    const response = await axios.post<ServiceResponse>(this.BASE_URL, service);
    return response.data;
  }

  /**
   * Update an existing service
   */
  static async update(id: number, service: Service): Promise<ServiceResponse> {
    const response = await axios.put<ServiceResponse>(`${this.BASE_URL}/${id}`, service);
    return response.data;
  }

  /**
   * Delete a service by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
