import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TramiteRoutingModule } from './tramite-routing.module';
import { TramitesService } from './application/tramites.service';
import { TramitesHttpService } from './infrastructure/tramites-http.service';
import { MisTramitesComponent } from './presentation/mis-tramites/mis-tramites.component';
import { DatosTramiteComponent } from './presentation/datos-tramite/datos-tramite.component';
import { NuevoTramiteComponent } from './presentation/nuevo-tramite/nuevo-tramite.component';

@NgModule({
  declarations: [
    MisTramitesComponent,
    DatosTramiteComponent,
    NuevoTramiteComponent
  ],
  imports: [
    CommonModule,
    TramiteRoutingModule,
    NgbPaginationModule,
    SharedModule,
  ],
  providers: [
    { provide: TramitesService, useClass: TramitesHttpService },
  ]
})
export class TramiteModule { }
