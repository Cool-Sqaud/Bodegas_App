import { UserService } from './../../_services/user.service';
import { DownloadService } from './../../_services/download.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    private downloadService: DownloadService,
    private userService: UserService
  ) {}

  user: any;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(res => 
      this.user = res
    ) 
  }

  download() {
    this.userService.getCurrentUser().subscribe(
      res => {
        console.log(res);
        this.downloadService.downloadJSON(res);
      }
    )  
  }
}
