// core/services/event.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private endpoint = 'events';

  constructor(private apiService: ApiService) { }

  getEvents(params?: any): Observable<any> {
    return this.apiService.get(this.endpoint, params);
  }

  getEventById(id: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  createEvent(event: any): Observable<any> {
    return this.apiService.post(this.endpoint, event);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.apiService.delete(this.endpoint, id);
  }

  // Métodos específicos para eventos
  addClientToEvent(eventId: string, clientId: string): Observable<any> {
    return this.apiService.post(`${this.endpoint}/${eventId}/clients`, { clientId });
  }

  removeClientFromEvent(eventId: string, clientId: string): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${eventId}/clients`, clientId);
  }

  getEventClients(eventId: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${eventId}/clients`);
  }
}
