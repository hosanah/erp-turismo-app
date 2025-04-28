// core/services/driver.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private endpoint = 'drivers';

  constructor(private apiService: ApiService) { }

  getDrivers(params?: any): Observable<any> {
    return this.apiService.get(this.endpoint, params);
  }

  getDriverById(id: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  createDriver(driver: any): Observable<any> {
    return this.apiService.post(this.endpoint, driver);
  }

  updateDriver(id: string, driver: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, driver);
  }

  deleteDriver(id: string): Observable<any> {
    return this.apiService.delete(this.endpoint, id);
  }

  // Método específico para obter motoristas disponíveis para um determinado período
  getAvailableDrivers(startDate: Date, endDate: Date): Observable<any> {
    return this.apiService.get(`${this.endpoint}/available`, { startDate, endDate });
  }
}
