import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { User } from './../interfaces';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends TokenService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`
  })

  constructor(
    private http: HttpClient
  ) { super(); }

  public getCurrentUser(): Observable<User | boolean> {
    return this.http.get(`${environment.API_URL}/user`, {headers: this.headers}).pipe(
      map(result =>  result as User), 
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          // if (err.status === 401) this.removeToken();
          if (err.status === 401) console.log("You would have been unauthorized...")
        }
        return of(false);
      })
    );
  }

  public getAllUsers(): Observable<Array<User> | boolean> {
    return this.http.get(`${environment.API_URL}/users`, {headers: this.headers}).pipe(
      map(result => result as Array<User>),
      catchError(() => {
        return of(false);
      })
    );
  }

  public getUser(id: number): Observable<User | boolean> {
    return this.http.get(`${environment.API_URL}/user/${id}`, {headers: this.headers}).pipe(
      map(result => result as User),
      catchError(() => {
        return of(false);
      })
    );
  }

  public adminAddUser(data: User) {
    return this.http.post(`${environment.API_URL}/admin/user`, data, {headers: this.headers}).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }

  public adminEditUser(id: number, data: User) {
    return this.http.put(`${environment.API_URL}/admin/user/${id}`, data, {headers: this.headers}).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }

  public adminDeleteUser(id: number) {
    return this.http.delete(`${environment.API_URL}/admin/user/${id}`, {headers: this.headers}).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }

  public adminPasswordReset(id: number, data: User) {
    return this.http.put(`${environment.API_URL}/admin/user/${id}/reset`, data, {headers: this.headers}).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }
}
