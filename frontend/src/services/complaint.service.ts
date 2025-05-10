import axios from "@/lib/axios";
import { ApiResponse, Complaint } from "@/types";

// Define specific response types
type ComplaintResponse = ApiResponse<Complaint>;
type ComplaintsResponse = ApiResponse<Complaint[]>;
type DeleteResponse = ApiResponse<null>;

export class ComplaintService {
  private static BASE_URL = '/api/complaints';

  /**
   * Get a single complaint by ID
   */
  static async get(id: number): Promise<ComplaintResponse> {
    const response = await axios.get<ComplaintResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all complaints with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<ComplaintsResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<ComplaintsResponse>(url);
    return response.data;
  }

  /**
   * Create a new complaint
   */
  static async create(complaint: Complaint): Promise<ComplaintResponse> {
    const response = await axios.post<ComplaintResponse>(this.BASE_URL, complaint);
    return response.data;
  }

  /**
   * Update an existing complaint
   */
  static async update(id: number, complaint: Complaint): Promise<ComplaintResponse> {
    const response = await axios.put<ComplaintResponse>(`${this.BASE_URL}/${id}`, complaint);
    return response.data;
  }

  /**
   * Delete a complaint by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
