import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Call } from '../../models/Call';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallsService {

 

  private apiUrl = '  http://localhost:3000/funeralRecords'; // Replace with actual API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Call[]> {
    return this.http.get<Call[]>(this.apiUrl);
  }



  createUser(call: Call): Observable<Call> {
    console.log('Sending call:', call); // confirm before sending
    return this.http.post<Call>(this.apiUrl, call);
  }
}
