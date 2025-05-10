import axios from "@/lib/axios";
import { ApiResponse, Employee } from "@/types";

// Define specific response types
type EmployeeResponse = ApiResponse<Employee>;
type EmployeesResponse = ApiResponse<Employee[]>;
type DeleteResponse = ApiResponse<null>;

export class EmployeeService {
  private static BASE_URL = '/api/employees';

  /**
   * Get a single employee by ID
   */
  static async get(id: number): Promise<EmployeeResponse> {
    const response = await axios.get<EmployeeResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  /**
   * Get all employees with optional filters
   */
  static async getAll(filters?: Record<string, string>): Promise<EmployeesResponse> {
    let url = this.BASE_URL;
    
    // Add query parameters if filters are provided
    if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value);
      });
      url += `?${params.toString()}`;
    }
    
    const response = await axios.get<EmployeesResponse>(url);
    return response.data;
  }

  /**
   * Create a new employee
   */
  static async create(employee: Employee): Promise<EmployeeResponse> {
    const response = await axios.post<EmployeeResponse>(this.BASE_URL, employee);
    return response.data;
  }

  /**
   * Update an existing employee
   */
  static async update(id: number, employee: Employee): Promise<EmployeeResponse> {
    const response = await axios.put<EmployeeResponse>(`${this.BASE_URL}/${id}`, employee);
    return response.data;
  }

  /**
   * Delete an employee by ID
   */
  static async delete(id: number): Promise<DeleteResponse> {
    const response = await axios.delete<DeleteResponse>(`${this.BASE_URL}/${id}`);
    return response.data;
  }
}
