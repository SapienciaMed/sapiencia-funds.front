export interface IStratum123 { 
  noProject: number,
  validity: string,
  idControlSelect:number,
  idConvocatoria:number
}

export interface IItemCreateForm {
    comuna: string;
    availableResource: number;
    granted: number;
    available: number;
    stake: number;
    legalized: number;
}