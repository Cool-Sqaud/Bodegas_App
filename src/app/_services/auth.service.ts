import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm, User } from '../interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends TokenService {
  constructor(
    private userService: UserService, 
    private http: HttpClient
  ) { super(); }

  public login(loginForm: LoginForm): Observable<boolean> {
    const data = {
      username: loginForm.email,
      password: loginForm.password,
      grant_type: 'password',
      client_id: environment.API_NR,
      client_secret: environment.API_KEY,
      scope: '*'
    }
    return this.http.post(`${environment.OAUTH_URL}/token`, data).pipe(
      map((result: any) => {
        // console.log(result); 
        this.setToken(result.access_token);
        return true;
      }),
      catchError((/*error*/) => {
        // console.log(error);
        return of(false);
      })
    )
  }

  public logout = () => {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    })
    this.removeToken();
    this.refreshLoggedIn();
    this.http.get(`${environment.API_URL}/user/logout`, {headers: headers})
  }

  public isLoggedIn: boolean = this.getToken() !== null;

  public refreshLoggedIn = (): boolean => this.isLoggedIn = this.getToken() !== null;

  public hasPermissionLevel(permissionLevel: number): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      map(result => {
        const user = result as User;
        if (user.role_id) return user.role_id >= permissionLevel;
        return false;
      })
    )
  }

  public getPermissionLevel(): Observable<number> {
    return this.userService.getCurrentUser().pipe(
      map(result => {
        const user = result as User;
        return user.role_id ? user.role_id : 0;
      })
    )
  }
}