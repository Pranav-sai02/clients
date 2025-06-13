import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sidebar } from '../models/Sidebar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private apiUrl = 'http://fusionedge.runasp.net/Get/MenuConfigurations';

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<Sidebar[]> {
    return this.http.get<Sidebar[]>(this.apiUrl);
  }
}
