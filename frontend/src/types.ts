// Client related types
export interface Client {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  vehicles?: Vehicle[];
  orders?: Order[];
  subscription?: Subscription;
}

// Vehicle related types
export interface Vehicle {
  id?: number;
  brand: string;
  model: string;
  licensePlate: string;
  clientId: number;
  // Add other vehicle properties as needed
}

// Order related types
export interface Order {
  id?: number;
  date: string;
  status: string;
  totalAmount: number;
  clientId: number;
  // Add other order properties as needed
}

// Subscription related types
export interface Subscription {
  id?: number;
  type: string;
  startDate: string;
  endDate: string;
  price: number;
  status: string;
  clientId: number;
  // Add other subscription properties as needed
}

// Service related types (Servicee in backend)
export interface Service {
  id?: number;
  name: string;
  description?: string;
  price: number;
  // Add other service properties as needed
}

// Review related types
export interface Review {
  id?: number;
  rating: number;
  comment: string;
  clientId: number;
  date: string;
  // Add other review properties as needed
}

// ReservationSlot related types
export interface ReservationSlot {
  id?: number;
  startTime: string;
  endTime: string;
  date: string;
  status: string;
  // Add other reservation slot properties as needed
}

// Product related types
export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  // Add other product properties as needed
}

// Payment related types
export interface Payment {
  id?: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: string;
  orderId?: number;
  // Add other payment properties as needed
}

// Employee related types
export interface Employee {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  role: string;
  // Add other employee properties as needed
}

// Complaint related types
export interface Complaint {
  id?: number;
  title: string;
  description: string;
  status: string;
  clientId: number;
  // Add other complaint properties as needed
}

// API response types
export interface ApiResponse<T = any> {
  message: string;
  code: number;
  status: string;
  data: T;
}
