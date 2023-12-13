import { DateTime } from "luxon";
import { array } from "yup";

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
  id_comuna: number | number[] | string;
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
 
export interface ICallRenewal {
  period?: string;
  fund?: string; 
  enabled?: string;
  renewed?: string;
  percentage?: string;
  page?: number;
  perPage?: number;
  enabledBachLeg?: number;
  
}

export interface ICallRenewalFilter {
  periodo?: string;
  page?: number;
  perPage?: number;

}

export interface IRenewalDataGrid{
  period?: string;
  fund?: string;
  enabled: string;
  renewed: string;
  percentage: string;
  page?: number;
  perPage?: number;
}

export interface ICallRenewalResponse {
  array: ICallRenewal[];
  meta: {
      total: number;
      per_page: number;
      current_page: number | null;
      last_page: number;
      first_page: number;
      first_page_url: string;
      last_page_url: string;
      next_page_url: string | null;
      previous_page_url: string | null;
  };
}

