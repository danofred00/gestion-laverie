import axios from "@/lib/axios";
import { ApiResponse, Payment } from "@/types";

// Define specific response types
type PaymentResponse = ApiResponse<Payment>;
type PaymentsResponse = ApiResponse<Payment[]>;
type DeleteResponse = ApiResponse<null>;

export class PaymentService {
  private static BASE_URL = '/api/payments';

  /**
   * Get a single payment by ID
   */
  static async get(id: number): Promise<PaymentResponse> {
    const response = await axios.get<PaymentResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all payments with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<PaymentsResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<PaymentsResponse>(url);
    return response.data;
  }

  /**
   * Create a new payment
   */
  static async create(payment: Payment): Promise<PaymentResponse> {
    const response = await axios.post<PaymentResponse>(this.BASE_URL, payment);
    return response.data;
  }

  /**
   * Update an existing payment
   */
  static async update(id: number, payment: Payment): Promise<PaymentResponse> {
    const response = await axios.put<PaymentResponse>(`${this.BASE_URL}/${id}`, payment);
    return response.data;
  }

  /**
   * Delete a payment by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
