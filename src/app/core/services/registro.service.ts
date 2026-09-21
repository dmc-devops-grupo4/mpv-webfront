import { Observable } from "rxjs";
import { RegistroRequest } from "../models/registro-request";

export abstract class RegistroService {
  abstract registrarPersona(request: RegistroRequest): Observable<unknown>
}
