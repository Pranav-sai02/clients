import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicesPage } from '../../models/Services-page';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ServicesPageService {
  private readonly baseUrl = API_ENDPOINTS.SERVICES_PAGE;

  constructor(private http: HttpClient) {}

  /** GET all */
  getAll(): Observable<ServicesPage[]> {
    return this.http.get<ServicesPage[]>(this.baseUrl);
  }

  /** GET single */
  get(id: number): Observable<ServicesPage> {
    return this.http.get<ServicesPage>(`${this.baseUrl}/${id}`);
  }

  /** POST create */
  create(payload: ServicesPage): Observable<ServicesPage> {
    return this.http.post<ServicesPage>(this.baseUrl, payload);
  }

  /** PUT update (JSON Server supports PUT for full update) */
  update(serviceId: number, payload: ServicesPage): Observable<ServicesPage> {
    return this.http.put<ServicesPage>(`${this.baseUrl}/${serviceId}`, payload);
  }
  /** DELETE */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
