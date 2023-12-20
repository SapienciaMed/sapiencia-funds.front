import { IRequerimentsConsolidate } from "./requeriments-consolidate";

export interface IBeneficiariesConsolidateInterface {
  id?: number | any;
  name: string;
  from: string;
  until: string;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
  requerimentsConsolidate?: IRequerimentsConsolidate[];
}
