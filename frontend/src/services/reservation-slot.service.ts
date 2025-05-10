import axios from "@/lib/axios";
import { ApiResponse, ReservationSlot } from "@/types";

// Define specific response types
type ReservationSlotResponse = ApiResponse<ReservationSlot>;
type ReservationSlotsResponse = ApiResponse<ReservationSlot[]>;
type DeleteResponse = ApiResponse<null>;

export class ReservationSlotService {
  private static BASE_URL = '/api/reservationslots';

  /**
   * Get a single reservation slot by ID
   */
  static async get(id: number): Promise<ReservationSlotResponse> {
    const response = await axios.get<ReservationSlotResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all reservation slots with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<ReservationSlotsResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<ReservationSlotsResponse>(url);
    return response.data;
  }

  /**
   * Create a new reservation slot
   */
  static async create(slot: ReservationSlot): Promise<ReservationSlotResponse> {
    const response = await axios.post<ReservationSlotResponse>(this.BASE_URL, slot);
    return response.data;
  }

  /**
   * Update an existing reservation slot
   */
  static async update(id: number, slot: ReservationSlot): Promise<ReservationSlotResponse> {
    const response = await axios.put<ReservationSlotResponse>(`${this.BASE_URL}/${id}`, slot);
    return response.data;
  }

  /**
   * Delete a reservation slot by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
