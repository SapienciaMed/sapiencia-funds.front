import { DateTime } from "luxon";

export interface IMasterActivity{
  id?: number;
  name: string;
  totalValue: number;
  codProgramCode: number;
  description?: string;
}

export interface IMasterActivityFilter {
    id?: number;
    name: string;
  }