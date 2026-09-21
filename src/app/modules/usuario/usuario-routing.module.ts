import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarDatosComponent } from './presentation/actualizar-datos/actualizar-datos.component';

const routes: Routes = [
  {
    path: '',
    component: ActualizarDatosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
