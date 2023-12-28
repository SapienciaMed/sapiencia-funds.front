import { IFiles } from "../../../../../common/interfaces/storage.interfaces";
import { IBeneficiariesConsolidateInterface } from "./beneficiaries-consolidate";

export interface ExternalFilesSapiencia {
  documentPath: string;
  parameters: [
    {
      documento: string;
      tipo: string;
      periodo: string;
      npseleccion: string;
    }
  ];
}

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
  externalInfoFiles?: ExternalFilesSapiencia;
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
