import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

   logError(error: any, context?: string): void {
    console.error(`[ERROR] [${context}]`, error);
    // Optional: send to external logging tool (Sentry, LogRocket, etc.)
  }
}
