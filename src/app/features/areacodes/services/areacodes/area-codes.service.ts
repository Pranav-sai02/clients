import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaCodes } from '../../models/AreaCodes';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AreaCodesService {
  private apiUrl = API_ENDPOINTS.AREA_CODES;
  // Replace with your real API endpoint

  constructor(private http: HttpClient) {}

  getAreaCodes(): Observable<AreaCodes[]> {
    return this.http.get<AreaCodes[]>(this.apiUrl);
  }

  deleteAreaCode(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${code}`);
  }

  //  addAreaCode(areaCode:  AreaCodes): Observable<AreaCodes> {
  //   return this.http.post<AreaCodes>(this.apiUrl, areaCode);
  // }
  addAreaCode(areaCode: AreaCodes): Observable<AreaCodes> {
    const payload = {
      AreaCode: areaCode.AreaCode,
      Description: areaCode.Description,
      Type: areaCode.Type,
      IsActive: areaCode.IsActive,
    };
    return this.http.post<AreaCodes>(this.apiUrl, payload);
  }

  updateAreaCode(
    areaCodeId: number,
    data: Partial<AreaCodes>
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${areaCodeId}`, data);
  }

  softDeleteAreaCode(areaCode: AreaCodes): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${areaCode.AreaCode}`, areaCode);
  }
}
