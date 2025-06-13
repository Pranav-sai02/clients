import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceProviders } from '../../models/ServiceProviders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicProvidersService {
  private baseUrl = 'http://fusionedge.runasp.net/ServiceProvider'; // Make sure db.json uses this endpoint
 
  constructor(private http: HttpClient) {}

  getServiceProviders(): Observable<ServiceProviders[]> {
    return this.http.get<ServiceProviders[]>(this.baseUrl);
  }

  addServiceProvider(provider: ServiceProviders): Observable<ServiceProviders> {
    return this.http.post<ServiceProviders>(this.baseUrl, provider);
  }

  updateServiceProvider(
    provider: ServiceProviders
  ): Observable<ServiceProviders> {
    return this.http.put<ServiceProviders>(
      `${this.baseUrl}/${provider.ServiceProviderId}`,
      provider
    );
  }

  deleteServiceProvider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
