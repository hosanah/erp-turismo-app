// core/services/report.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private endpoint = 'reports';

  constructor(private apiService: ApiService) { }

  // Método para gerar relatórios com base nos filtros
  generateReport(filters: any): Observable<any> {
    return this.apiService.post(`${this.endpoint}/generate`, filters);
  }

  // Métodos específicos para diferentes tipos de relatórios
  getEventsReport(startDate: Date, endDate: Date, eventType?: string): Observable<any> {
    const params = { startDate, endDate, eventType };
    return this.apiService.get(`${this.endpoint}/events`, params);
  }

  getSalesReport(startDate: Date, endDate: Date, minAmount?: number): Observable<any> {
    const params = { startDate, endDate, minAmount };
    return this.apiService.get(`${this.endpoint}/sales`, params);
  }

  getClientsReport(startDate: Date, endDate: Date): Observable<any> {
    const params = { startDate, endDate };
    return this.apiService.get(`${this.endpoint}/clients`, params);
  }

  getDriversReport(startDate: Date, endDate: Date, status?: string): Observable<any> {
    const params = { startDate, endDate, status };
    return this.apiService.get(`${this.endpoint}/drivers`, params);
  }

  getVehiclesReport(startDate: Date, endDate: Date, status?: string): Observable<any> {
    const params = { startDate, endDate, status };
    return this.apiService.get(`${this.endpoint}/vehicles`, params);
  }

  // Métodos para exportação de relatórios
  exportReportToPdf(reportType: string, filters: any): Observable<any> {
    return this.apiService.post(`${this.endpoint}/export/pdf/${reportType}`, filters);
  }

  exportReportToExcel(reportType: string, filters: any): Observable<any> {
    return this.apiService.post(`${this.endpoint}/export/excel/${reportType}`, filters);
  }
  
  // Métodos de atalho para exportação (para compatibilidade com o componente)
  exportPdf(filters: any): Observable<any> {
    return this.exportReportToPdf(filters.reportType, filters);
  }

  exportExcel(filters: any): Observable<any> {
    return this.exportReportToExcel(filters.reportType, filters);
  }
}
