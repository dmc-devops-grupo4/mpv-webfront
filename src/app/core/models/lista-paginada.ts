export interface ListaPaginada<T> {
  pagina: number;
  porPagina: number;
  datos: Array<T>;
  total: number;
}
