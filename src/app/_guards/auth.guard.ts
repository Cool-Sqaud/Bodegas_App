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
    if (!route.data['authGuardNeedsLoggedIn']) return true;
    if (!this.authService.isLoggedIn) return this.notLoggedIn();
    
    const permissionLevel: number | null = route.data['authGuardPermissionLevel'];
    if (!permissionLevel) return true;
    if (this.authService.hasPermissionLevel(permissionLevel)) return true;
    
    const redirectUrl: string | null = route.data['authGuardRedirect'];
    if (!redirectUrl) this.redirect('');
    else this.redirect(redirectUrl);
    return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!childRoute.data['authGuardNeedsLoggedIn']) return true;
      if (!this.authService.isLoggedIn) return this.notLoggedIn();
      
      const permissionLevel: number | null = childRoute.data['authGuardPermissionLevel'];
      if (!permissionLevel) return true;
      if (this.authService.hasPermissionLevel(permissionLevel)) return true;
      
      const redirectUrl: string | null = childRoute.data['authGuardRedirect'];
      if (!redirectUrl) this.redirect('');
      else this.redirect(redirectUrl);
      return false;
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
    return this.authService.isLoggedIn;
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
