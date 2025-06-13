import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = API_ENDPOINTS.USERS; // Replace with actual API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}?UserName=${encodeURIComponent(user.UserEmail)}`;
    return this.http.put<User>(url, user);
  }

  createUser(user: User): Observable<User> {
    console.log('Sending user:', user); // confirm before sending
    return this.http.post<User>(this.apiUrl, user);
  }
}
