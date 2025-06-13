import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class AddtoCartService {
  url = 'https://ecommerce.routemisr.com/api/v1/cart';
  cartNum: BehaviorSubject<number> = new BehaviorSubject(0);
  isBrowser: boolean;

  constructor(private http: HttpClient, private auth: AuthService, @Inject(PLATFORM_ID) platformId: Object

  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.getLoggedUserProductFromCart().subscribe({
      next: (response: any) => {
        this.cartNum.next(response.numOfCartItems);
      }
    })
  }

  private get token(): string {
    return this.isBrowser ? localStorage.getItem('token') || '' : '';
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
