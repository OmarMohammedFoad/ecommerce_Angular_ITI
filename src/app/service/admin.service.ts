import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  images?: string[];
  category: string | { _id: string; name: string; };
  subcategory?: string;
  brand?: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  quantity: number;
}

export interface Category {
  _id?: string;
  name: string;
  slug?: string;
  image: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private http: HttpClient) {}

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'token': this.token,
      'Content-Type': 'application/json'
    });
  }

  // Products CRUD
  getAllProducts(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/products?page=${page}&limit=${limit}`, {
      headers: this.getHeaders()
    });
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`, {
      headers: this.getHeaders()
    });
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product, {
      headers: this.getHeaders()
    });
  }

  updateProduct(id: string, product: Partial<Product>): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product, {
      headers: this.getHeaders()
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Categories CRUD
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, {
      headers: this.getHeaders()
    });
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${id}`, {
      headers: this.getHeaders()
    });
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, category, {
      headers: this.getHeaders()
    });
  }

  updateCategory(id: string, category: Partial<Category>): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, category, {
      headers: this.getHeaders()
    });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Users Management
  getAllUsers(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?page=${page}&limit=${limit}`, {
      headers: this.getHeaders()
    });
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`, {
      headers: this.getHeaders()
    });
  }

  updateUser(id: string, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user, {
      headers: this.getHeaders()
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`, {
      headers: this.getHeaders()
    });
  } 

  changeUserPassword(id: string, password: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/changePassword/${id}`, 
      { password }, 
      { headers: this.getHeaders() }
    );
  }
}