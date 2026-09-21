import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { UsuarioLogin } from '../models/usuario-login';
import { StorageService } from './storage.service';
import { LoginResponse } from '../models/login-response';
import { LocalStorage } from '../constants/local-storage.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged = false;
  private urlLogin: string;
  private urlSeguridad: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {
    this.urlLogin = `${environment.baseUrlApi}/auth/login`;
    this.urlSeguridad = `${environment.baseUrlApiSeguridad}/api`
  }

  login(user: UsuarioLogin): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.urlSeguridad}/v1/auth`, user);
  }

  // cambiarContrasenia(user: CambiarContrasenia): Observable<unknown> {
  //   return this.httpClient.post<unknown>(`${environment.baseUrlApi}/api/seguridad/cambiar-password`, user);
  // }

  async saveLoginData(data: LoginResponse, redirect: string = "/") {
    this.isLogged = true;
    // this.storageService.save(LocalStorage.ITEM_NAME_ACCESS_TOKEN, data.accessToken);
    // this.storageService.save(LocalStorage.ITEM_NAME_REFRESH_TOKEN, data.refreshToken);
    this.storageService.save(LocalStorage.ITEM_NAME_ACCESS_TOKEN, "testAccessToken");
    this.storageService.save(LocalStorage.ITEM_NAME_REFRESH_TOKEN, "testRefreshToken");
    this.storageService.save("idPersona", data.idPersona.toString());
    this.storageService.save("idUsuario", data.idUsuario.toString());
    this.storageService.save("nombres", data.nombres.toUpperCase());
    this.storageService.save("nroDocumento", data.nroDocumento);
    this.router.navigate([redirect]);
  }

  logout() {
    this.isLogged = false;
    this.storageService.clear();
    // window.location.href = '/auth/login';
    window.location.href = '';
  }

  get userIsLogged(): boolean {
    const accessToken = this.storageService.get(
      LocalStorage.ITEM_NAME_ACCESS_TOKEN
    );
    return this.isLogged || !!accessToken;
  }

  get hasRole(): boolean {
    return true
    // const accessToken = this.storageService.get(LocalStorage.ITEM_NAME_ACCESS_TOKEN);
    // if (!accessToken)
    //   return false;
    // const payload: any = jwt_decode(!accessToken ? '' : (accessToken as string));
    // const rol = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    // return rol && rol != "";
  }

  getIdUsuario(): number {
    const data = this.storageService.get("idUsuario");
    return Number(data)
    // const payload: any = jwt_decode(!accessToken ? '' : (accessToken as string));
    // return payload['userid'];
  }
  getIdPersona(): number {
    const data = this.storageService.get("idPersona");
    return Number(data)
    // const accessToken = this.storageService.get(LocalStorage.ITEM_NAME_ACCESS_TOKEN);
    // const payload: any = jwt_decode(!accessToken ? '' : (accessToken as string));
    // return payload['userid'];
  }

  getNombre(): string {
    const data = this.storageService.get("nombres") ?? "";
    return data
    // const accessToken = this.storageService.get(LocalStorage.ITEM_NAME_ACCESS_TOKEN);
    // const payload: any = jwt_decode(!accessToken ? '' : (accessToken as string));
    // return payload['nombre'];
  }

  getNroDoc(): string {
    const data = this.storageService.get("nroDocumento") ?? "";
    return data
    // const accessToken = this.storageService.get(LocalStorage.ITEM_NAME_ACCESS_TOKEN);
    // const payload: any = jwt_decode(!accessToken ? '' : (accessToken as string));
    // return payload['nroDoc'];
  }

  getRol(): string {
    const accessToken = this.storageService.get(LocalStorage.ITEM_NAME_ACCESS_TOKEN);
    const payload: any = jwt_decode(!accessToken ? '' : (accessToken as string));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  isUserInRoles(...rolesAllowed: string[]): boolean {
    const rolUser = this.getRol();
    let isAllowed = false;

    for (const role of rolesAllowed) {
      if (rolUser == role) {
        isAllowed = true;
        break;
      }
    }

    return isAllowed;
  }

  getNewAccessToken(): Observable<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshToken = this.storageService.get(LocalStorage.ITEM_NAME_REFRESH_TOKEN);
    return this.httpClient.get<{ accessToken: string; refreshToken: string }>(
      `${""}/refresh/${refreshToken}`
    );
  }
}
