import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonaService } from '../application/persona.service';
import { Persona } from '../domain/persona';
import { ActualizarPersona } from '../domain/actualizar-persona';


@Injectable()
export class PersonaHttpService implements PersonaService {
  private urlPersona: string;

  constructor(
    private readonly http: HttpClient
  ) {
      this.urlPersona = `${environment.baseUrlApiPersona}/api`
  }

  obtenerPersona(idPersona: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.urlPersona}/v1/personas/${idPersona}`);
  }
  actualizar(idPersona: number, request: ActualizarPersona): Observable<unknown> {
    return this.http.put<unknown>(`${this.urlPersona}/v1/personas/${idPersona}`, request)
  }

}
