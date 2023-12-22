import { IFiles } from "../../../../../common/interfaces/storage.interfaces";
import { IBeneficiariesConsolidateInterface } from "./beneficiaries-consolidate";

export interface ISocialServiceBeneficiary {
  id?: number;
  legalizationPeriod: string;
  idConsolidationBeneficiary: number;
  hoursBorrowed: number;
  committedHours: number;
  pendingHours: number;
  supportDocumentRoute: string;
  observation: string;
  state: boolean;
  infoFiles?: IFiles[];
  editable: boolean;
  beneficiarieConsolidate?: IBeneficiariesConsolidateInterface;
}

export interface ISocialServiceBeneficiaryUpdate {
  id: number;
  idConsolidationBeneficiary: number;
  state?: boolean;
  observation: string;
  editable: boolean;
}
