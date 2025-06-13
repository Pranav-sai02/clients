import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Call } from '../../models/Call';

@Injectable({
  providedIn: 'root'
})
export class CallDataService {

   private selectedCallSubject = new BehaviorSubject<Call | null>(null);
  selectedCall$ = this.selectedCallSubject.asObservable();

  setSelectedCall(call: Call) {
    this.selectedCallSubject.next(call);
  }

  clearSelectedCall() {
    this.selectedCallSubject.next(null);
  }

   getSelectedCall(): Call | null {
    return this.selectedCallSubject.value;
  }
}
