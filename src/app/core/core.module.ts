import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './presentation/components/header/header.component';
import { MenuComponent } from './presentation/components/menu/menu.component';
import { FooterComponent } from './presentation/components/footer/footer.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { NotFoundComponent } from './presentation/pages/not-found/not-found.component';
import { MaestrosService } from './services/maestros.service';
import { MaestrosHttpService } from './services/maestros-http.service';
import { RegistroService } from './services/registro.service';
import { RegistroHttpService } from './services/registro-http.service';
import { RegistroComponent } from './presentation/pages/registro/registro.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    // LoginComponent,
    // SeleccionarRolComponent,
    // NotFoundComponent,
  ],
  providers: [
    { provide: MaestrosService, useClass: MaestrosHttpService },
    { provide: RegistroService, useClass: RegistroHttpService },
  ]
})
export class CoreModule { }
