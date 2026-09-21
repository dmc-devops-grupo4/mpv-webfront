import { Observable } from 'rxjs';
import { Oficina, TipoDocumento, Tramite } from '../domain/tramite';
import { Solicitud } from '../domain/solicitud';

export abstract class TramitesService {
  abstract listarTramitesPorFiltros(idUsuario: number, fechaIni: string, fechaFin: string,
    nroDocumento: string, asunto: string, estado: number): Observable<Array<Tramite>>

  abstract obtenerTramite(idTramite: number): Observable<Tramite>

  abstract listarOficinas(): Observable<Array<Oficina>>
  abstract listarTiposDocumento(): Observable<Array<TipoDocumento>>
  abstract enviarSolicitud(request: Solicitud): Observable<unknown>
}
