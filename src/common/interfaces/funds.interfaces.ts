import { DateTime } from "luxon";

export interface IMasterActivity{
  id?: number;
  name: string;
  codProgramCode?: number;
  totalValue: number;
  typesProgram: IProgramTypes;
  description?: string;
}

export interface IMasterActivityFilter {
    id?: number;
    name: string;
}


export interface IProgramTypes {
    id?: number;
    name?: string;
}