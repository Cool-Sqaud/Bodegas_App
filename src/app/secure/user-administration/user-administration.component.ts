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
  useradd: FormGroup = new FormGroup({
    role_id: new FormControl(null),
    first_name: new FormControl(null),
    last_name: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
  });
  user: FormGroup = new FormGroup({
    name: new FormControl(null),
  });
  usersFound = true;
  loadedUsers = false;
  appHeight = window.innerHeight - 200;
  selectedUser!: User;
  
  rawUsers: Array<User> = [];
  postedUsers: Array<User> = [];

  constructor (
    private userService: UserService,
  ) { }

  show() {
    document.getElementById('add-container')!.classList.remove('hidden');
    
  }

  hide() {
    document.getElementById('add-container')!.classList.add('hidden');
    
  }

  

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe(result => {
      if (!result || result === true) this.usersFound = false;  
      else {
        this.rawUsers = this.postedUsers = result;
        this.selectedUser = result[0];
      }
      console.log(this.postedUsers)
      this.loadedUsers = true;
    });
    document.getElementById('add-container')!.addEventListener('click', event => {
      const target = event.target;
      
      if (target instanceof HTMLDivElement && target.classList.contains('add-container')) {
        document.getElementById('add-container')!.classList.add('hidden');
      }
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
  
  view(id: number) {
    this.rawUsers.forEach(user => {
      if (user.id == id) this.selectedUser = user;
    })
  }

  onDelete(): void {
  if (this.selectedUser.role_id > 1)  return;
  if (confirm('Delete user: ' + this.selectedUser.first_name + ' ' + this.selectedUser.last_name + '?'))
    this.userService.adminDeleteUser(this.selectedUser.id).subscribe(res => console.log(res))
  }

  onCreate_Pop_Up(): void {
    document.getElementById('add-container')!.classList.remove('hidden');
  }

  onCreate(): void {
    //if (this.selectedUser.role_id > 1)  return;

    const data ={
      role_id : this.useradd.value.role_id,
      first_name : this.useradd.value.first_name,
      last_name : this.useradd.value.last_name,
      email : this.useradd.value.email,
      password : this.useradd.value.password
    }
    console.log(data)
    this.userService.adminAddUser(data).subscribe(res => console.log(res))
  }

  onEdit(): void {

  }
}

// const newUser = {
//   role_id: 1,
//   first_name: 'uifwahui',
//   last_name: 'hrgehuiijwioegjw',
//   email: 'fwahjufwauihf@mail.com',
//   password: 'password'
// }
// this.userService.adminAddUser(newUser);