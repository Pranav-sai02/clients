import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { LoggerService } from '../services/logger/logger.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackbarService: SnackbarService,
    private logger: LoggerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.logError(error, req.url);

        let message = 'An unexpected error occurred.';

        if (error.status === 0) {
          message = 'Network error. Please check your internet connection.';
        } else if (error.status >= 400 && error.status < 500) {
          message = error.error?.message || 'Client error.';
        } else if (error.status >= 500) {
          message = 'Server error. Please try again later.';
        }

        this.snackbarService.showError(message);
        return throwError(() => new Error(message));
      })
    );
  }
}
