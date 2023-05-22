import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  isLoggedIn = false;

  constructor(
    private authService: AuthService
  ) { }

  onSubmit(): void {
    if (!this.loginForm.valid) { 
      console.log(this.loginForm.value, 'is invalid');
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (result: any) => {
        if (result) {
          this.authService.refreshLoggedIn();
          window.location.href = `http://localhost:4200/`;
        }
      }
    )
  }
}