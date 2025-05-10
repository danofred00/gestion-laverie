import axios from "@/lib/axios";
import { ApiResponse, Subscription } from "@/types";

// Define specific response types
type SubscriptionResponse = ApiResponse<Subscription>;
type SubscriptionsResponse = ApiResponse<Subscription[]>;
type DeleteResponse = ApiResponse<null>;

export class SubscriptionService {
  private static BASE_URL = '/api/subscriptions';

  /**
   * Get a single subscription by ID
   */
  static async get(id: number): Promise<SubscriptionResponse> {
    const response = await axios.get<SubscriptionResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all subscriptions with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<SubscriptionsResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<SubscriptionsResponse>(url);
    return response.data;
  }

  /**
   * Create a new subscription
   */
  static async create(subscription: Subscription): Promise<SubscriptionResponse> {
    const response = await axios.post<SubscriptionResponse>(this.BASE_URL, subscription);
    return response.data;
  }

  /**
   * Update an existing subscription
   */
  static async update(id: number, subscription: Subscription): Promise<SubscriptionResponse> {
    const response = await axios.put<SubscriptionResponse>(`${this.BASE_URL}/${id}`, subscription);
    return response.data;
  }

  /**
   * Delete a subscription by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
