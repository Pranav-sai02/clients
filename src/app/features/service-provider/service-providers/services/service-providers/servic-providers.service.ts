import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProviders } from '../../models/ServiceProviders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicProvidersService {
  private apiUrl = 'http://fusionedge.runasp.net/ServiceProvider'; // Make sure db.json uses this endpoint

  constructor(private http: HttpClient) { }

  getServiceProviders(): Observable<ServiceProviders[]> {
    return this.http.get<ServiceProviders[]>(this.apiUrl);
  }

  addServiceProvider(provider: ServiceProviders): Observable<ServiceProviders> {
    return this.http.post<ServiceProviders>(this.apiUrl, provider);
  }

  updateServiceProvider(
    provider: ServiceProviders
  ): Observable<ServiceProviders> {
    return this.http.put<ServiceProviders>(
      `${this.apiUrl}/${provider.ServiceProviderId}`,
      provider
    );
  }

  deleteServiceProvider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  softDeleteServiceProviders(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { IsDeleted: true });
  }
}
