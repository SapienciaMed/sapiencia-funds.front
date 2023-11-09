import { DateTime } from "luxon";

export interface IMasterActivity{
  id?: number;
  name: string;
  codProgramCode?: number,
  totalValue: number;
  description?: string;
  typesProgram?: IProgramTypes;
  userModified?: string;
  dateModified?: DateTime;
  userCreate?: string;
  dateCreate?: DateTime;

}

export interface IMasterActivityFilter {
    id?: number;
    name: string;
}

export interface IProgramTypes {
    id?: number;
    name?: string;
    typeMasterList?: ITypeMaster;
    description?: string
}

export interface IProgramTypesActivity {
    id?: number;
    name?: string;
    typeMasterList?: ITypeMaster;
  description?: string,
  totalValue: number
}

export interface ITypeMaster {
    id?: number;
    name?: string;    
}

export interface IUploadInformation{
  id?: number;
  commune: string;
  validity: string;
  information: string;
  fileName?: string;
  dateUpload: string;
  User?: string;
  dataToSend?:string; 
  emails?:string[];
}

export interface IWorker {
  id?: number;
  typeDocument: string;
  numberDocument: string;
  firstName: string;
  secondName?: string;
  surname: string;
  secondSurname?: string;
}

export interface IEmailDataGrid{
  id?: number;
  user?:string;
  email?: string;
  lastNames?: string;
  ident?: string;
}

export interface ICallBudget {
  id_comuna: number;  //id_comuna
  presupuesto_comuna: string; //presupuesto_comuna
  acumulado_legali_comuna: string; //legaliza_comuna
  restante_presupuesto_comuna: string; //restante_presupuesto
  numero_usuarios_comuna: number; //usuarios_comuna
  periodo: number; //periodo
  puntaje_corte: number; //puntaje_corte
  cierre: number;
  total_proyectado: string;
  Diferencia: string;

}
 