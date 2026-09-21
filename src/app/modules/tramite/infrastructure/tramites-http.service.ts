import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oficina, TipoDocumento, Tramite } from '../domain/tramite';
import { TramitesService } from '../application/tramites.service';
import { Solicitud } from '../domain/solicitud';


@Injectable()
export class TramitesHttpService implements TramitesService {
  private urlTramites: string;

  constructor(
    private readonly http: HttpClient
  ) {
      this.urlTramites = `${environment.baseUrlApiTramites}/api`
  }

  listarTramitesPorFiltros(idUsuario: number, fechaIni: string, fechaFin: string,
    nroDocumento: string, asunto: string, estado: number): Observable<Array<Tramite>> {
      const params = new HttpParams()
      // .set('idUsuario', idUsuario)
      .set('fechaIni', fechaIni)
      .set('fechaFin', fechaFin)
      .set('nroDocumento', nroDocumento)
      .set('asunto', asunto)
      .set('estado', estado ?? '')

    return this.http.get<Array<Tramite>>(`${this.urlTramites}/v1/tramites/por-usuario/${idUsuario}/por-filtros`, { params });
  }

  obtenerTramite(idTramite: number): Observable<Tramite> {
    return this.http.get<Tramite>(`${this.urlTramites}/v1/tramites/${idTramite}`);
  }

  listarOficinas(): Observable<Array<Oficina>> {
    return this.http.get<Array<Oficina>>(`${this.urlTramites}/v1/oficinas`);
  }

  listarTiposDocumento(): Observable<Array<TipoDocumento>> {
    return this.http.get<Array<TipoDocumento>>(`${this.urlTramites}/v1/tipos-documento`);
  }

  enviarSolicitud(request: Solicitud): Observable<unknown> {
    return this.http.post<unknown>(`${this.urlTramites}/v1/tramites`, request)
  }
}
