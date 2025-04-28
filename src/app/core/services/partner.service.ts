// core/services/partner.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private endpoint = 'partners';

  constructor(private apiService: ApiService) { }

  getPartners(params?: any): Observable<any> {
    return this.apiService.get(this.endpoint, params);
  }

  getPartnerById(id: string): Observable<any> {
    return this.apiService.get(`${this.endpoint}/${id}`);
  }

  createPartner(partner: any): Observable<any> {
    return this.apiService.post(this.endpoint, partner);
  }

  updatePartner(id: string, partner: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, partner);
  }

  deletePartner(id: string): Observable<any> {
    return this.apiService.delete(this.endpoint, id);
  }
}
