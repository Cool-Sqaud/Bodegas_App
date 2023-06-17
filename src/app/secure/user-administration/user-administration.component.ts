import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent implements OnInit {
  user: FormGroup = new FormGroup({
    name: new FormControl(null),
  });
  usersFound = true;
  loadedUsers = false;
  appHeight = window.innerHeight - 200;
  selectedUser = 0;
  
  rawUsers: Array<User> = [];
  postedUsers: Array<User> = [];

  constructor (
    private userService: UserService,
  ) { }
  
  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe(result => {
      if (!result || result === true) this.usersFound = false;  
      else {
        this.rawUsers = result;
        this.postedUsers = result;
      }
      console.log(this.postedUsers)
      this.loadedUsers = true;
    });
  }

  onSubmit(): void {
    // console.log(this.station.value.number);
    this.loadedUsers = false;
    if (this.user.value.name) this.postedUsers = this.search(this.user.value.name);
    else this.postedUsers = this.rawUsers;
    this.loadedUsers = true;
  }

  search = (filter: string) => this.rawUsers.filter(
    (user) => user.first_name.concat(' ', user.last_name).toLowerCase().includes(filter.toLowerCase()))
  
  view = (id: number) => this.selectedUser = id-1;

}
