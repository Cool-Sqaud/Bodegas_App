import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit{
  isLoading: boolean = false;
  role: Number = 1;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getPermissionLevel().subscribe(
      result => {
        this.role = result;
        this.isLoading = true;;;
      }
    )
  }
}
