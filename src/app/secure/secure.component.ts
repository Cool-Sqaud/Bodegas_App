import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {
  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  logout(): void {
    this.router.navigate(['logout'])
  }
}
