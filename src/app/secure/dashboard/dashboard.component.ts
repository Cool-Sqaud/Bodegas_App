import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
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
