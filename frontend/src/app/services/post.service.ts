import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('x-access-token', token || '');
  }

  createPost(message: string): Observable<any> {
    return this.http.post(this.apiUrl, { message }, { headers: this.getAuthHeaders() });
  }

  editPost(id: string, message: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { message }, { headers: this.getAuthHeaders() });
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getMyPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-posts`, { headers: this.getAuthHeaders() });
  }

  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
