import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MaestrosService } from './maestros.service';
import { TipoPersona } from '../models/maestros/tipo-persona';
import { TipoDocIdentidad } from '../models/maestros/tipo-doc-identidad';
import { Ubigeo } from '../models/maestros/ubigeo';
import { Archivo } from '../models/maestros/archivo';

@Injectable({
  providedIn: 'root'
})
export class MaestrosHttpService implements MaestrosService {
  private urlPersona: string;
  private urlArchivo: string;

  constructor(
    private readonly http: HttpClient,
  ) {
    this.urlPersona = `${environment.baseUrlApiPersona}/api`
    this.urlArchivo =  `${environment.baseUrlApiArchivo}/api`
  }

  listarTiposPersona(): Observable<Array<TipoPersona>> {
    return this.http.get<Array<TipoPersona>>(`${this.urlPersona}/v1/tipos-persona`)
  }

  listarTiposDocIdentidad(): Observable<Array<TipoDocIdentidad>> {
    return this.http.get<Array<TipoDocIdentidad>>(`${this.urlPersona}/v1/tipos-doc-identidad`)
  }

  listarUbigeo(): Observable<Array<Ubigeo>> {
    return this.http.get<Array<Ubigeo>>(`${this.urlPersona}/v1/ubigeos`)
  }

  obtenerArchivo(idArchivo: string): Observable<Blob>{
    let htmlOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<Blob>(`${this.urlArchivo}/v1/archivos/${idArchivo}/descargar`, htmlOptions);
  }

  subirArchivo(archivo: File): Observable<Archivo> {
    const formData = new FormData();
    formData.append('file', archivo);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<Archivo>(`${this.urlArchivo}/v1/archivos`, formData, { headers })
  }
}
