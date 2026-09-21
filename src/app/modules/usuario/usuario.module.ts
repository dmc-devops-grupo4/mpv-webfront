import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { ActualizarDatosComponent } from './presentation/actualizar-datos/actualizar-datos.component';
import { PersonaService } from './application/persona.service';
import { PersonaHttpService } from './infrastructure/persona-http.service';

@NgModule({
  declarations: [
    ActualizarDatosComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: PersonaService, useClass: PersonaHttpService },
  ]
})
export class UsuarioModule { }
