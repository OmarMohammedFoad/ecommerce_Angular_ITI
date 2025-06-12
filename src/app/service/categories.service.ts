import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) {
  }
  url:string="https://ecommerce.routemisr.com/api/v1/categories"

  private get token(): string {
    return localStorage.getItem('token') || '';
  }
  private getHeaders = () => {
    return new HttpHeaders({
      token: this.token,
    });
  };
  getAllCategories(){
    return this.http.get(this.url,{
      headers:this.getHeaders()
    });
  } 
}
