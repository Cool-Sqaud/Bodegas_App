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
  search: FormGroup = new FormGroup({
    filter: new FormControl(null),
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

  filter() {
    const filter = this.search.value.filter.toLowerCase();
    if (filter) {
      this.postedUsers = this.rawUsers.filter(user => {
        if (user.first_name.concat(' ', user.last_name).toLowerCase().includes(filter)) return user;
        if (user.email.toLowerCase().includes(filter)) return user;
        if (user.id.toString().toLowerCase().includes(filter)) return user;
        return;
      });
    }
    else this.postedUsers = this.rawUsers;
  }

  view(id: number) {
    this.rawUsers.forEach(user => {
      if (user.id == id) this.selectedUser = user;
    })
  }

  onDelete(): void {
  if (this.selectedUser.role_id > 1)  return;
  if (confirm('Delete user: ' + this.selectedUser.first_name + ' ' + this.selectedUser.last_name + '?'))
    this.userService.adminDeleteUser(this.selectedUser.id).subscribe(res => console.log(res))

    for (let i = 0; i < this.rawUsers.length; i++) {
      if (this.rawUsers[i].id === this.selectedUser.id) {
        this.rawUsers.splice(i, 1);
        this.filter();
        return;
      }
    }
  }

  onCreate_Pop_Up(): void {
    document.getElementById('add-container')!.classList.remove('hidden');
  }

  onCreate(): void {
    const data ={
      role_id : this.useradd.value.role_id,
      first_name : this.useradd.value.first_name,
      last_name : this.useradd.value.last_name,
      email : this.useradd.value.email,
      password : this.useradd.value.password
    }
    this.userService.adminAddUser(data).subscribe(res => {
      if(res){
        this.rawUsers.push(res as User);
        this.filter();
        document.getElementById('add-container')!.classList.add('hidden');
      }
    });
  }

  onEdit(): void {

  }

  displayRole_as_Name(): void{
    
  }
}