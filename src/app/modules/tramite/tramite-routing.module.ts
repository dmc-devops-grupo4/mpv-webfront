import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTramitesComponent } from './presentation/mis-tramites/mis-tramites.component';
import { DatosTramiteComponent } from './presentation/datos-tramite/datos-tramite.component';
import { NuevoTramiteComponent } from './presentation/nuevo-tramite/nuevo-tramite.component';

const routes: Routes = [
  {
    path: '',
    component: MisTramitesComponent,
  },
  {
    path: 'nuevo',
    component: NuevoTramiteComponent,
  },
  {
    path: ':idTramite',
    component: DatosTramiteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramiteRoutingModule { }
