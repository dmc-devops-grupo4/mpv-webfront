import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificacionesComponent } from './presentation/pages/notificaciones/notificaciones.component';
import { NotificacionDetalleComponent } from './presentation/pages/notificacion-detalle/notificacion-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesComponent,
  },
  {
    path: ':idNotificacion',
    component: NotificacionDetalleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasillaRoutingModule { }
