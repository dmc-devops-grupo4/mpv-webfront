import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard  {
  private readonly urlLogin = '/auth/login';
  private readonly urlRedirect = '/';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canLoad(route: Route): boolean {
    const userLogged = this.authService.userIsLogged;
    const hasRole = this.authService.hasRole;
    const roles = route.data?.roles as string[];

    if (!userLogged || !hasRole)
      this.router.navigate([this.urlLogin]);

    if (roles && roles.length > 0){
      if(this.authService.isUserInRoles(...roles))
        return true

      this.router.navigate([this.urlRedirect]);
    }

    return true;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userLogged = this.authService.userIsLogged;
    const hasRole = this.authService.hasRole;
    const roles = route.data?.roles as string[];

    if (!userLogged || !hasRole)
      this.router.navigate([this.urlLogin]);

    if (roles && roles.length > 0){
      if(this.authService.isUserInRoles(...roles))
        return true

      this.router.navigate([this.urlRedirect]);
    }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    const userLogged = this.authService.userIsLogged;
    const hasRole = this.authService.hasRole;
    const roles = childRoute.data?.roles as string[];

    if (!userLogged || !hasRole)
      this.router.navigate([this.urlLogin]);

    if (roles && roles.length > 0){
      if(this.authService.isUserInRoles(...roles))
        return true

      this.router.navigate([this.urlRedirect]);
    }

    return true;
  }
}
