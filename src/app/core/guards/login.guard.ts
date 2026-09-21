import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard  {
  private readonly urlRedirect = '/';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canLoad(): boolean {
    const userLogged = this.authService.userIsLogged;
    const hasRole = this.authService.hasRole;
    if (userLogged && hasRole) {
      this.router.navigate([this.urlRedirect]);
      return false;
    }
    return true;
  }

  canActivate(): boolean {
    const userLogged = this.authService.userIsLogged;
    const hasRole = this.authService.hasRole;
    if (userLogged && hasRole) {
      this.router.navigate([this.urlRedirect]);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    const userLogged = this.authService.userIsLogged;
    const hasRole = this.authService.hasRole;
    if (userLogged && hasRole) {
      this.router.navigate([this.urlRedirect]);
      return false;
    }
    return true;
  }
}
