export interface ICallDating {
    convocatoria: number;
    programa: number;
    usuario: number;
    taquilla: number;
    fecha: string;
    hora_inicio: number;
    estado: number;
    nombre: number;
    identificacion: number;
  }
  
  export interface ICallDatingFilters {
    convocatoria: number;
    programa: number | number[] | string;
    page: number;
    perPage: number;
  }