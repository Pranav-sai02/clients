import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/authservice/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    userName: '',
    password: '',
  };
  showPassword = false;

  constructor(private router: Router, private authService: AuthService,private toastr: ToastrService) {}
  togglePassword(){
    this.showPassword =!this.showPassword;
  }

  onLogin() {
    console.log('Login button clicked:', this.loginObj);
    const { userName, password } = this.loginObj;
    if(userName !=='admin@gmail.com'){
      this.toastr.error('Email is not valid');
      return;
    }
    if(password !=='admin'){
      this.toastr.error('Incorrect password');
      return;
    }
    if (this.authService.login(userName, password)) {
      this.toastr.success('Login Successful');
      console.log('Login successful, navigating...');
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      this.toastr.error('Login failed');
    }
  }
}
