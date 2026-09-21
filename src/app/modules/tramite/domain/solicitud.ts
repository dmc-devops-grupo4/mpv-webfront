export interface Solicitud {
  idUsuario: number;
  idOficina: number;
  idTipoDocumento: number;
  nroDocumento: string;
  asunto: string;
  observacion: string;
  archivosId: string[];
}
