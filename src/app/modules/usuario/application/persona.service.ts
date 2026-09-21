import { Observable } from 'rxjs';
import { Persona } from '../domain/persona';
import { ActualizarPersona } from '../domain/actualizar-persona';

export abstract class PersonaService {
  abstract obtenerPersona(idTramite: number): Observable<Persona>
  abstract actualizar(idPersona: number, request: ActualizarPersona): Observable<unknown>
}
