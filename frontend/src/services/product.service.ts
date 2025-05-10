import axios from "@/lib/axios";
import { ApiResponse, Product } from "@/types";

// Define specific response types
type ProductResponse = ApiResponse<Product>;
type ProductsResponse = ApiResponse<Product[]>;
type DeleteResponse = ApiResponse<null>;

export class ProductService {
  private static BASE_URL = '/api/products';

  /**
   * Get a single product by ID
   */
  static async get(id: number): Promise<ProductResponse> {
    const response = await axios.get<ProductResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all products with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<ProductsResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<ProductsResponse>(url);
    return response.data;
  }

  /**
   * Create a new product
   */
  static async create(product: Product): Promise<ProductResponse> {
    const response = await axios.post<ProductResponse>(this.BASE_URL, product);
    return response.data;
  }

  /**
   * Update an existing product
   */
  static async update(id: number, product: Product): Promise<ProductResponse> {
    const response = await axios.put<ProductResponse>(`${this.BASE_URL}/${id}`, product);
    return response.data;
  }

  /**
   * Delete a product by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
