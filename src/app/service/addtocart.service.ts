import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddtoCartService {
  url = 'https://ecommerce.routemisr.com/api/v1/cart';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private get token(): string {
    return localStorage.getItem('token') || '';
  }
  private getHeaders = () => {
    return new HttpHeaders({
      token: this.token,
    });
  };

  addToCart(productId: string) {
    return this.http.post(
      `${this.url}`,
      { productId },
      {
        headers: this.getHeaders(),
      }
    );
  }

  getLoggedUserProductFromCart() {
    return this.http.get(`${this.url}`, {
      headers: this.getHeaders(),
    });
  }

  updateCartProductQuantity(productId: string, count: number) {
    return this.http.put(
      `${this.url}/${productId}`,
      { count },
      {
        headers: this.getHeaders(),
      }
    );
  }

  removeAllCart() {
    return this.http.delete(`${this.url}`, {
      headers: this.getHeaders(),
    });
  }

  removeSpecificItemFromCart(productId: string) {
    return this.http.delete(`${this.url}/${productId}`, {
      headers: this.getHeaders(),
    });
  }
}
