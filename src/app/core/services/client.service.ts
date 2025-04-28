// core/services/client.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private endpoint = 'clients';

  constructor(private apiService: ApiService) { }

  getClients(params?: any): Observable<any> {
    return this.apiService.get(this.endpoint, params);
  }

  getClientById(id: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  createClient(client: any): Observable<any> {
    return this.apiService.post(this.endpoint, client);
  }

  updateClient(id: string, client: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.apiService.delete(this.endpoint, id);
  }
}
