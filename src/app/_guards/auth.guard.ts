import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {
  constructor (
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(obs => {
      if (!route.data) return obs.next(true);
      if (!route.data['authGuardNeedsLoggedIn']) return obs.next(true);
      if (!this.authService.isLoggedIn) return obs.next(false);

      const permissionLevel: number | null = route.data['authGuardPermissionLevel'];
      if (!permissionLevel) return obs.next(true);
      return this.authService.hasPermissionLevel(permissionLevel).subscribe(res => obs.next(res ? true : false))
    })
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable<boolean>(obs => {
        if (!childRoute.data) return obs.next(true);
        if (!childRoute.data['authGuardNeedsLoggedIn']) return obs.next(true);
        if (!this.authService.isLoggedIn) return obs.next(false);
  
        const permissionLevel: number | null = childRoute.data['authGuardPermissionLevel'];
        if (!permissionLevel) return obs.next(true);
        return this.authService.hasPermissionLevel(permissionLevel).subscribe(res => obs.next(res ? true : false))
      })
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
    return new Observable<boolean>(obs => {
      if (!route.data) return obs.next(true);
      if (!route.data['authGuardNeedsLoggedIn']) return obs.next(true);
      if (!this.authService.isLoggedIn) return obs.next(false);

      const permissionLevel: number | null = route.data['authGuardPermissionLevel'];
      if (!permissionLevel) return obs.next(true);
      return this.authService.hasPermissionLevel(permissionLevel).subscribe(res => obs.next(res ? true : false))
    })
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
  private notLoggedIn() {
    this.redirect('');
    return false;
  }

  private redirect = ($path: string) => this.router.navigate([$path]);
}
