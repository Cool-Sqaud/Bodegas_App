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

  sortSettings: [String, String] = ['Id', 'DESC'];
  
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
        if (filter === 'user') return user.role_id === 0 ? user : null;
        if (filter === 'admin') return user.role_id > 0 ? user : null;
        if (user.first_name.concat(' ', user.last_name).toLowerCase().includes(filter)) return user;
        if (user.email.toLowerCase().includes(filter)) return user;
        if (user.id.toString().toLowerCase().includes(filter)) return user;
        return;
      });
    }
    else this.postedUsers = this.rawUsers;
  }

  sortById() {
    this.postedUsers.sort((a, b) => {
      if (this.sortSettings[0] === 'Id' && this.sortSettings[1] === 'DESC') 
        return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
      return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
    });
    this.rawUsers.sort((a, b) => {
      if (this.sortSettings[0] === 'Id' && this.sortSettings[1] === 'DESC') 
        return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
      return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
    });
    if (this.sortSettings[0] === 'Id'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'Id';
  }

  sortByEmail() {
    this.postedUsers.sort((a, b) => {
      if (this.sortSettings[0] === 'Email' && this.sortSettings[1] === 'DESC') 
        return a.email > b.email ? -1 : a.email < b.email ? 1 : 0;
      return a.email > b.email ? 1 : a.email < b.email ? -1 : 0;
    });
    this.rawUsers.sort((a, b) => {
      if (this.sortSettings[0] === 'Email' && this.sortSettings[1] === 'DESC') 
        return a.email > b.email ? -1 : a.email < b.email ? 1 : 0;
      return a.email > b.email ? 1 : a.email < b.email ? -1 : 0;
    });
    if (this.sortSettings[0] === 'Email'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'Email';
  }

  sortByFirstName() {
    this.postedUsers.sort((a, b) => {
      const [aFirst, bFirst] = [a.first_name.toLowerCase(), b.first_name.toLowerCase()];
      if (this.sortSettings[0] === 'First Name' && this.sortSettings[1] === 'DESC') 
        return aFirst > bFirst ? -1 : aFirst < bFirst ? 1 : 0;
      return aFirst > bFirst ? 1 : aFirst < bFirst ? -1 : 0;
    });
    this.rawUsers.sort((a, b) => {
      const [aFirst, bFirst] = [a.first_name.toLowerCase(), b.first_name.toLowerCase()];
      if (this.sortSettings[0] === 'First Name' && this.sortSettings[1] === 'DESC') 
        return aFirst > bFirst ? -1 : aFirst < bFirst ? 1 : 0;
      return aFirst > bFirst ? 1 : aFirst < bFirst ? -1 : 0;
    });
    if (this.sortSettings[0] === 'First Name'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'First Name';
  }

  sortByLastName() {
    this.postedUsers.sort((a, b) => {
      const [aLast, bLast] = [a.last_name.toLowerCase(), b.last_name.toLowerCase()];
      if (this.sortSettings[0] === 'Last Name' && this.sortSettings[1] === 'DESC') 
        return aLast > bLast ? -1 : aLast < bLast ? 1 : 0;
      return aLast > bLast ? 1 : aLast < bLast ? -1 : 0;
    });
    this.rawUsers.sort((a, b) => {
      const [aLast, bLast] = [a.last_name.toLowerCase(), b.last_name.toLowerCase()];
      if (this.sortSettings[0] === 'Last Name' && this.sortSettings[1] === 'DESC') 
        return aLast > bLast ? -1 : aLast < bLast ? 1 : 0;
      return aLast > bLast ? 1 : aLast < bLast ? -1 : 0;
    });
    if (this.sortSettings[0] === 'Last Name'&& this.sortSettings[1] === 'DESC') this.sortSettings[1] = 'ASC';
    else this.sortSettings[1] = 'DESC';

    this.sortSettings[0] = 'Last Name';
  }

  getRoleName(role: number) {
    if (role === 0) return "User";
    if (role === 1) return "Admin";
    if (role === 2) return "Super Admin";
    return "Undefined"
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