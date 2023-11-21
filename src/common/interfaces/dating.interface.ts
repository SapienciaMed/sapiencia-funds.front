export interface ICallDating {
    convocatoria: number;
    programa: number;
    id_usuario: number;
    taquilla: number;
    fecha: string;
    hora_inicio: number;
    estado: number;
    nombre: number;
    cedula: number;
  }
  
  export interface ICallDatingFilters {
    convocatoria: number;
    programa: number | number[] | string;
    page: number;
    perPage: number;
  }