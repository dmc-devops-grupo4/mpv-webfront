import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isProduction: boolean
  username: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.isProduction = environment.production
    this.username = this.authService.getNombre().toUpperCase();
  }

  ngOnInit(): void {
    return;
  }

  logout() {
    this.router.navigate(['/auth/login']);
    this.authService.logout();
  }

  cambiarContrasenia() {
    this.router.navigate(['/cambiar-contrasenia']);
  }
}
