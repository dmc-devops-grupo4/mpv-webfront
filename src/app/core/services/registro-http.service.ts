import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistroRequest } from '../models/registro-request';
import { RegistroService } from './registro.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroHttpService implements RegistroService {
  private urlPersona: string;

  constructor(
    private readonly http: HttpClient,
  ) {
    this.urlPersona = `${environment.baseUrlApiPersona}/api`
  }

  registrarPersona(request: RegistroRequest): Observable<unknown> {
    return this.http.post<unknown>(`${this.urlPersona}/v1/personas`, request)
  }

}
