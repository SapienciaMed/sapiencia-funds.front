export interface IVotingCreate {
  id?: number;
  communeNeighborhood: number;
  numberProject: number;
  validity: string;
  ideaProject: string;
  observation?: string;
}

export interface IItemCreate {
  id?: number;
  aimStraight: number;
  productCatalogueDnp: number;
  codPmaProgram: string;
  codMtaTeacherActivity: string;
  costTotal: string;
  percentage123: string;
  percentage456: string;
  codRtVotingResult: string;
}

export interface IVotingSearcheResult {
  activity: any;
  total: any
  id?: number;
  aimStraight: number;
  productCatalogueDnp: number;
  codPmaProgram: string;
  codMtaTeacherActivity: string;
  costTotal: string;
  percentage123: string;
  percentage456: string;
  codRtVotingResult: string;
  ident: number;
  total456: number;
  total123: number;
  activityValue: number;
  totalCost: number;
}

export interface IVotingResultGrid {
  porcentaje456: number;
  porcentaje123: number;
  totalCost: number;
  amount: number;
  activityValue: number;
  directObject: string;
  productCatalog: number;
  productCode: number;
  program: string;
  activity: string;
  ident: number;
  idActivity: number;
  idProgram: number;
}

export interface IItemCreateRegTable {
  directObject: string;
  productCatalog: number;
  productCode: number;
  program: string;
  activity: string;
  porcentaje456: number;
  porcentaje123: number;
  totalCost: number;
  amount: number;
  activityValue: number;
}

export interface IItemCreateForm {
  directObject: string;
  productCatalog: number;
  productCode: number;
  program: string;
  activity: string;
  porcentaje456: number;
  porcentaje123: number;
  totalCost: number;
  amount: number;
  activityValue: number;
}

export interface IVotinItemCreate {
  communeNeighborhood: number;
  numberProject: number;
  validity: string;
  ideaProject: string;
  items: Array<IItemSave>;
}

export interface IItemSave {
  aimStraight: string;
  productCatalogueDnp: number;
  codProductgueDnp: number;
  codPmaProgram: number;
  codMtaTeacherActivity: number;
  amount: number;
  costTotal: number;
  percentage123: number;
  percentage456: number;
}

export interface IItemsUpdate {
  aimStraight: string;
  productCatalogueDnp: number;
  codProductgueDnp: number;
  codPmaProgram: number;
  codMtaTeacherActivity: number;
  amount: String;
  costTotal: String;
  percentage123: String;
  percentage456: String;
  codRtVotingResult?: String;
}
