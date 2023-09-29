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