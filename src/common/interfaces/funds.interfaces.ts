import { ITypeMaster } from './funds.interfaces';
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