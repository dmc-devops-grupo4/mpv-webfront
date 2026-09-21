import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificacionesService } from '../application/notificaciones.service';
import { Notificacion } from '../domain/notificacion';
import { environment } from 'src/environments/environment';


@Injectable()
export class NotificacionesHttpService implements NotificacionesService {
  private urlNotificaciones: string;

  constructor(
    private readonly http: HttpClient
  ) {
      this.urlNotificaciones = `${environment.baseUrlApiNotificaciones}/api`
  }

  listarNotificaciones(idPersona: number): Observable<Array<Notificacion>> {
    return this.http.get<Array<Notificacion>>(`${this.urlNotificaciones}/v1/notificaciones/por-persona/${idPersona}`);
  }

  obtenerNotificacion(idNotificacion: number): Observable<Notificacion> {
    return this.http.get<Notificacion>(`${this.urlNotificaciones}/v1/notificaciones/${idNotificacion}`);
  }

}
