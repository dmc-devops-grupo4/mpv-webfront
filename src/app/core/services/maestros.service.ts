import { Observable } from "rxjs";
import { Ubigeo } from "../models/maestros/ubigeo";
import { TipoPersona } from "../models/maestros/tipo-persona";
import { TipoDocIdentidad } from "../models/maestros/tipo-doc-identidad";
import { Archivo } from "../models/maestros/archivo";

export abstract class MaestrosService {
  abstract listarTiposPersona(): Observable<Array<TipoPersona>>
  abstract listarTiposDocIdentidad(): Observable<Array<TipoDocIdentidad>>
  abstract listarUbigeo(): Observable<Array<Ubigeo>>
  abstract obtenerArchivo(idArchivo: string): Observable<Blob>
  abstract subirArchivo(archivo: File): Observable<Archivo>
}
