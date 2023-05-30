import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  isLoggedIn: boolean = this.authService.isLoggedIn;
  role: Number = 0;

  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getPermissionLevel().subscribe(
      result => this.role = result
    )
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loginRefresh();
      }
    })
  }

  private loginRefresh = (): boolean => this.isLoggedIn = this.authService.refreshLoggedIn();
}
