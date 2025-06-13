import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../models/Claim';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  private apiUrl = 'http://localhost:8080/api/claims/getAllClaims';

  constructor(private http: HttpClient) {}

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl);
  }
}
