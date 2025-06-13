import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  //  constructor(private snackBar: MatSnackBar) {}

  // showError(message: string): void {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 1000,
  //     panelClass: ['error-snackbar']
  //   });
  // }

  // showSuccess(message: string): void {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 1000,
  //     panelClass: ['success-snackbar']
  //   });
  // }

     constructor(private toastr: ToastrService) {}

  showError(message: string): void {
    this.toastr.error(message, 'Error');
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success');
  }

  showInfo(message: string): void {
    this.toastr.info(message, 'Info');
  }

  showWarning(message: string): void {
    this.toastr.warning(message, 'Warning');
  }

}
