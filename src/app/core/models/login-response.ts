// export interface LoginResponse {
//   // success: boolean
//   // errorMessage: string
//   // accessToken: string
//   // refreshToken: string
// }

export interface LoginResponse {
  idUsuario: number;
  verificado: boolean;
  // fechaVerificacion: Date | null;
  activo: boolean;
  idPersona: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nroDocumento: string;
}
