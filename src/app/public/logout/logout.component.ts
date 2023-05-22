import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-logout',
  template: '<p>loggin out</p>'
})
export class LogoutComponent implements OnInit{
  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate([''])
  }
}
