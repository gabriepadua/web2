import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  register(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nome, email, senha });
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }
}
