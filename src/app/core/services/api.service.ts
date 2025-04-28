// core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Método genérico para requisições GET
  get<T>(endpoint: string, params?: any): Observable<T> {
    const options = { params: new HttpParams() };
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          options.params = options.params.set(key, params[key]);
        }
      });
    }
    
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, options);
  }

  // Método genérico para requisições POST
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  // Método genérico para requisições PUT
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  // Método genérico para requisições DELETE
  delete<T>(endpoint: string, id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }
}
