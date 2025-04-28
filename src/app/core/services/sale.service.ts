// core/services/sale.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private endpoint = 'sales';

  constructor(private apiService: ApiService) { }

  getSales(params?: any): Observable<any> {
    return this.apiService.get(this.endpoint, params);
  }

  getSaleById(id: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  createSale(sale: any): Observable<any> {
    // Assuming the backend handles voucher generation on sale creation
    return this.apiService.post(this.endpoint, sale);
  }

  updateSale(id: string, sale: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, sale);
  }

  deleteSale(id: string): Observable<any> {
    return this.apiService.delete(this.endpoint, id);
  }

  // Potentially add a method to get voucher details if needed
  getVoucher(saleId: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${saleId}/voucher`);
  }
}
