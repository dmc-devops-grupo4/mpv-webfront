export interface Persona {
  idPersona: number;
  tipoDocIdentidad: TipoDocIdentidad;
  tipoPersona: TipoPersona;
  ubigeo: Ubigeo;
  nroDocumento: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  direccion: string;
  correo: string;
  celular: string;
  ruc: string;
  razonSocial: string;
  activo: boolean;
}

export interface TipoDocIdentidad {
  idTipoDocIdentidad: number;
  descripcion: string;
}

export interface TipoPersona {
  idTipoPersona: number;
  descripcion: string;
}

export interface Ubigeo {
  codUbigeo: string;
  departamento: string;
  provincia: string;
  distrito: string;
}
