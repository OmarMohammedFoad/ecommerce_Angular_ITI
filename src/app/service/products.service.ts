import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
interface PaginatedResponse<T> {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number | null;
  };
  data: T[];
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'https://ecommerce.routemisr.com/api/v1/products';
  constructor(private http: HttpClient) {}

  getAllProducts(page: number = 1, limit: number = 20) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse<any>>(this.url, { params });
  }
  getOneProduct(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
}
