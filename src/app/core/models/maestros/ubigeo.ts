export interface Ubigeo {
  codUbigeo: string;
  departamento: string;
  provincia: string;
  distrito: string;
}

export class Departamento {
  codigo: string;
  nombre : string;
}

export class Provincia {
  codigo: string;
  nombre : string;
  // codigoDepartamento : string;
}

export class Distrito {
  codigo: string;
  nombre : string;
  // codigoProvincia : string;
  // codigoDepartamento : string;
}
