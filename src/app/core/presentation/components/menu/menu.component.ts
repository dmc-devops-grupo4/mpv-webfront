import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolEnum } from 'src/app/core/constants/rol.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // idTipoPersona: string =""
  // idTipoDocIdentidad: string =""
  nombre: string
  nroDocumento: string
  idUsuario: number
  idPersona: number

  ROL = RolEnum

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.authService.getIdUsuario()
    this.idPersona = this.authService.getIdPersona()
    this.nroDocumento = this.authService.getNroDoc()
    this.nombre = this.authService.getNombre().toUpperCase()
  }

  estaEnRutas(rutas: string[]){
    const rutaActual = this.router.url;
    return rutas.includes(rutaActual)
  }
}
