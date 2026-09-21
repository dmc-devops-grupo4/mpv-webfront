import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/presentation/pages/login/login.component';
import { NotFoundComponent } from './core/presentation/pages/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { RegistroComponent } from './core/presentation/pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tramites',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
  },
  {
    path: 'tramites',
    loadChildren: () => import('./modules/tramite/tramite.module').then((m) => m.TramiteModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'casilla',
    loadChildren: () => import('./modules/casilla/casilla.module').then((m) => m.CasillaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'usuario',
    loadChildren: () => import('./modules/usuario/usuario.module').then((m) => m.UsuarioModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
