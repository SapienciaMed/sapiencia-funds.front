import { IBeneficiariesConsolidateInterface } from "./beneficiaries-consolidate";

export interface ISocialServiceBeneficiary {
  id?: number;
  legalizationPeriod: string;
  consolidationBeneficiary: number;
  hoursBorrowed: number;
  committedHours: number;
  pendingHours: number;
  supportDocumentRoute: string;
  observation: string;
  state: boolean;
  beneficiarieConsolidate?: IBeneficiariesConsolidateInterface;
}
