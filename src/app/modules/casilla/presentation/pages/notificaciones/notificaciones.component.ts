import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/config/config.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificacionesService } from '../../../application/notificaciones.service';
import { Notificacion } from '../../../domain/notificacion';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  notificaciones: Notificacion[] = [];

  page = 1;
  pageSize= 25;
  collectionSize = this.notificaciones.length;

  constructor(
    private readonly configService : ConfigService,
    private readonly notificacionesService: NotificacionesService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.configService.config = {
      layout: { hidden: false },
    }

  }

  ngOnInit(): void {
    this.listarNotificaciones();
    console.log();
  }

  listarNotificaciones(){
    const idPersona = this.authService.getIdPersona()

    this.notificacionesService.listarNotificaciones(idPersona)
    .subscribe((list) => {
      this.notificaciones = list
        .map((notificacion, i) => ({rowNum: i + 1, ...notificacion}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        this.collectionSize = list.length;
    });
  }

  verDetalleNotificacion(event: any) {
    // event.stopPropagation();
    alert('detalle');
  }


}
