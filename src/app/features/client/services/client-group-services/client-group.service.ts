import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientGroup } from '../../models/ClientGroup';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupService {

      
  private apiUrl = API_ENDPOINTS.CLIENTGROUP;
  

  constructor(private http: HttpClient) {}

  getClientGroups(): Observable<ClientGroup[]> {
    return this.http.get<ClientGroup[]>(this.apiUrl);
  }

  addClientGroup(clientGroup: ClientGroup): Observable<ClientGroup> {
    return this.http.post<any>(this.apiUrl, clientGroup);
  }

  updateClientGroup(clientGroup: ClientGroup): Observable<ClientGroup> {
    return this.http.put<ClientGroup>(`${this.apiUrl}/${clientGroup.ClientGroupId}`, clientGroup);
  }

  deleteClientGroup(id: number ): Observable<ClientGroup> {
    return this.http.delete<ClientGroup>(`${this.apiUrl}/${id}`);
  }

   softDeleteClientGroup(id: number ): Observable<ClientGroup> {
    return this.http.patch<ClientGroup>(`${this.apiUrl}/${id}`, {IsDeleted: true});
  }
  
}
