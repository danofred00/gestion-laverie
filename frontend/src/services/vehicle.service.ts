import axios from "@/lib/axios";
import { ApiResponse, Vehicle } from "@/types";

// Define specific response types
type VehicleResponse = ApiResponse<Vehicle>;
type VehiclesResponse = ApiResponse<Vehicle[]>;
type DeleteResponse = ApiResponse<null>;

export class VehicleService {
  private static BASE_URL = '/api/vehicles';

  /**
   * Get a single vehicle by ID
   */
  static async get(id: number): Promise<VehicleResponse> {
    const response = await axios.get<VehicleResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all vehicles with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<VehiclesResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<VehiclesResponse>(url);
    return response.data;
  }

  /**
   * Create a new vehicle
   */
  static async create(vehicle: Vehicle): Promise<VehicleResponse> {
    const response = await axios.post<VehicleResponse>(this.BASE_URL, vehicle);
    return response.data;
  }

  /**
   * Update an existing vehicle
   */
  static async update(id: number, vehicle: Vehicle): Promise<VehicleResponse> {
    const response = await axios.put<VehicleResponse>(`${this.BASE_URL}/${id}`, vehicle);
    return response.data;
  }

  /**
   * Delete a vehicle by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
