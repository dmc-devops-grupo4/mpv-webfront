import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CasillaRoutingModule } from './casilla-routing.module';
import { NotificacionesComponent } from './presentation/pages/notificaciones/notificaciones.component';
import { NotificacionesService } from './application/notificaciones.service';
import { NotificacionesHttpService } from './infrastructure/notificaciones-http.service';
import { NotificacionDetalleComponent } from './presentation/pages/notificacion-detalle/notificacion-detalle.component';


@NgModule({
  declarations: [
    NotificacionesComponent,
    NotificacionDetalleComponent
  ],
  imports: [
    CommonModule,
    CasillaRoutingModule,
    NgbPaginationModule,
    SharedModule,
  ],
  providers: [
    { provide: NotificacionesService, useClass: NotificacionesHttpService },
  ]
})
export class CasillaModule { }
