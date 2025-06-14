import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesPage } from '../../models/Services-page';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ServicesPageService {
  private readonly apiUrl = API_ENDPOINTS.SERVICES_PAGE;

  constructor(private http: HttpClient) {}

  /** GET all */
  getAll(): Observable<ServicesPage[]> {
    return this.http.get<ServicesPage[]>(this.apiUrl);
  }

  /** GET single */
  get(id: number): Observable<ServicesPage> {
    return this.http.get<ServicesPage>(`${this.apiUrl}/${id}`);
  }

  /** POST create */
  create(payload: ServicesPage): Observable<ServicesPage> {
    return this.http.post<ServicesPage>(this.apiUrl, payload);
  }

  /** PUT update (JSON Server supports PUT for full update) */
  update(serviceId: number, payload: ServicesPage): Observable<ServicesPage> {
    return this.http.put<ServicesPage>(`${this.apiUrl}/${serviceId}`, payload);
  }
  /** DELETE */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  softDeleteServices(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { IsDeleted: true });
  }


  
  
}
