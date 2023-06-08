import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  constructor(
    private userService: UserService
    ) {}
    
  user: any;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res => 
      this.user = res
    ) 
  }

}
