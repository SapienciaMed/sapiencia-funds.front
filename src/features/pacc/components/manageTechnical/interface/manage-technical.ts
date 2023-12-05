export interface PqrsdfResultSimple {
  numberPqrsdf: number;
  dateFiled: Date | string;
  program: string;
  clasify: string;
  reason: string;
  state: string;
  answerDate: Date | string;
  answer: string;
}

export interface IRequerimentsResultSimple {
  id?: number;
  idBeneficiary: number;
  idReglament: number;
  idRequirement: number;
  descriptionRequirement: string;
  activeRequirement: boolean
  percentRequirement: number | null;
  accomplished?: number;
}

export interface IApplyKnowledgeTransfer {
  id?: number;
  idBeneficiary: number;
  idReglament: number;
  committedHours: number;
  workedHours: number;
  pendingHours: number;
  percentTransfer: number;
  status: number;
  idStatusProcessPacc: number;
  observations: string;
  userCreate: string;
  dateCreate: Date;
}
