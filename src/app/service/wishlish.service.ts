import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlishService {
  url = 'https://ecommerce.routemisr.com/api/v1/wishlist/';

  constructor(private http: HttpClient) {}
  private get token(): string {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token') || '';
    }
    return ''; // Default to empty string for SSR
  }
  private getHeaders = () => {
    return new HttpHeaders({
      token: this.token,
    });
  };

  addToWishList(productId: string) {
    console.log(this.getHeaders());

    return this.http.post(
      `${this.url}`,
      { productId },
      {
        headers: this.getHeaders(),
      }
    );
  }

  getLoggedUserWishLish() {
    return this.http.get(`${this.url}`, {
      headers: this.getHeaders(),
    });
  }

  removeLoggedUserWishLish(productId: string) {
    return this.http.delete(`${this.url}${productId}`, {
      headers: this.getHeaders(),
    });
  }
}
