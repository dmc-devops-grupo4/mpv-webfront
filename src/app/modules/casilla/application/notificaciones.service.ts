import { Observable } from 'rxjs';
import { Notificacion } from '../domain/notificacion';

export abstract class NotificacionesService {
  abstract listarNotificaciones(idPersona: number): Observable<Array<Notificacion>>
  abstract obtenerNotificacion(idNotificacion: number): Observable<Notificacion>
}
