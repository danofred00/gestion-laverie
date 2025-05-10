import axios from "@/lib/axios";
import { ApiResponse, Review } from "@/types";

// Define specific response types
type ReviewResponse = ApiResponse<Review>;
type ReviewsResponse = ApiResponse<Review[]>;
type DeleteResponse = ApiResponse<null>;

export class ReviewService {
  private static BASE_URL = '/api/reviews';

  /**
   * Get a single review by ID
   */
  static async get(id: number): Promise<ReviewResponse> {
    const response = await axios.get<ReviewResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all reviews with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<ReviewsResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<ReviewsResponse>(url);
    return response.data;
  }

  /**
   * Create a new review
   */
  static async create(review: Review): Promise<ReviewResponse> {
    const response = await axios.post<ReviewResponse>(this.BASE_URL, review);
    return response.data;
  }

  /**
   * Update an existing review
   */
  static async update(id: number, review: Review): Promise<ReviewResponse> {
    const response = await axios.put<ReviewResponse>(`${this.BASE_URL}/${id}`, review);
    return response.data;
  }

  /**
   * Delete a review by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
