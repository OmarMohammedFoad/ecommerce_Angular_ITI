import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface user {
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  message: string;
  user: user;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  url: string = 'https://ecommerce.routemisr.com/api/v1/auth';
  register(
    name: string,
    email: string,
    password: string,
    rePassword: string,
    phone: string
  ): Observable<AuthResponse> {
    // console.log(name);

    return this.http.post<AuthResponse>(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        name,
        email,
        password,
        rePassword,
        phone,
      }
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/signin`, {
      email,
      password,
    });
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      return token !== null && token.trim() !== ''; // Ensure token is not null or empty
    }
    return false; // Default to not logged in for SSR
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    
  }
}
