export interface Tramite {
  idTramite: number;
  fecha: string; // Puedes cambiar esto a Date si planeas manejarlo como una fecha
  oficina: Oficina;
  tipoDocumento: TipoDocumento;
  nroDocumento: string;
  asunto: string;
  observacion: string;
  usuario: Usuario;
  estado: number;
  estadoString: string;
  motivoRechazo: string;
  activo: boolean;
  tramiteArchivos: TramiteArchivo[];
}

export interface Oficina {
  idOficina: number;
  nombre: string;
}

export interface TipoDocumento {
  idTipoDocumento: number;
  nombre: string;
  abreviatura: string;
}

export interface Usuario {
  idUsuario: number;
  nroDocumento: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  activo: boolean;
}

export interface TramiteArchivo {
  idTramiteArchivo: number;
  idArchivo: string;
  nombreArchivo: string;
  activo: boolean;
}
