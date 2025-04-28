// core/services/vehicle.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private endpoint = 'vehicles';

  constructor(private apiService: ApiService) { }

  getVehicles(params?: any): Observable<any> {
    return this.apiService.get(this.endpoint, params);
  }

  getVehicleById(id: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  createVehicle(vehicle: any): Observable<any> {
    return this.apiService.post(this.endpoint, vehicle);
  }

  updateVehicle(id: string, vehicle: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.apiService.delete(this.endpoint, id);
  }

  // Método específico para obter veículos disponíveis para um determinado período
  getAvailableVehicles(startDate: Date, endDate: Date): Observable<any> {
    return this.apiService.get(`${this.endpoint}/available`, { startDate, endDate });
  }
}
