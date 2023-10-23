import { DateTime } from "luxon";

export interface IMasterActivity{
  id?: number;
  name: string;
  codProgramCode?: number,
  totalValue: number;
  description?: string;
  typesProgram?: IProgramTypes;
}

export interface IMasterActivityFilter {
    id?: number;
    name: string;
}

export interface IProgramTypes {
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