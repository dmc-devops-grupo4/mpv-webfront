export interface Notificacion {
  idNotificacion: number;
  emisor: Emisor;
  destinatario: Destinatario;
  fecha: Date;
  idPersona: number;
  asunto: string;
  contenido: string;
  leido: boolean;
  fechaLeido: Date;
  destacado: boolean;
  alertadoCorreo: boolean;
  correo: string;
  activo: boolean;
  archivos: Archivo[];
}

export interface Emisor {
  idEmisor: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface Destinatario {
  idNotificacion: number;
  tipoPersona: number;
  tipoDocIdentidad: number;
  nroDocIdentidad: string;
  nombreCompleto: string;
  ruc: string;
  razonSocial: string;
}

export interface Archivo {
  idNotificacionArchivo: number;
  notificacion: string;
  nombre: string;
  ruta: string;
  activo: boolean;
}
