import axios from "@/lib/axios";
import { ApiResponse, Order } from "@/types";

// Define specific response types
type OrderResponse = ApiResponse<Order>;
type OrdersResponse = ApiResponse<Order[]>;
type DeleteResponse = ApiResponse<null>;

export class OrderService {
  private static BASE_URL = '/api/orders';

  /**
   * Get a single order by ID
   */
  static async get(id: number): Promise<OrderResponse> {
    const response = await axios.get<OrderResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all orders with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<OrdersResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<OrdersResponse>(url);
    return response.data;
  }

  /**
   * Create a new order
   */
  static async create(order: Order): Promise<OrderResponse> {
    const response = await axios.post<OrderResponse>(this.BASE_URL, order);
    return response.data;
  }

  /**
   * Update an existing order
   */
  static async update(id: number, order: Order): Promise<OrderResponse> {
    const response = await axios.put<OrderResponse>(`${this.BASE_URL}/${id}`, order);
    return response.data;
  }

  /**
   * Delete an order by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
