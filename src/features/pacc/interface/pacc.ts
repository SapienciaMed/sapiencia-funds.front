export interface IConsolidationTrayForTechnicianCollectionParams {
  idBenef?: number;
  idCut?: number;
  idProgram?: number;
  creditId: number;
  nroFiducy: number;
  document: string;
  fullName: string;
  program: string;
  legalDate: string;
  dateIncomeCut: string; 
  cut: string;
  dateFinallyCut: string; 
  dateEndGracePeriod: Date | null;
  status: string;
  reason: string;
  characterization: string;
  currentResponsible: string;
}

export interface ICutInterface {
  id?: number | any;
  name: string;
  from: string;
  until: string;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
}

export interface IStepCashing{
  idCut: string
}

export interface IConsolidationTrayForTechnicianCollection {
  searchParam?: string;
  cutParamName?: string; 
  cutParamId?: number; 
  page: number,
  perPage: number;
}
