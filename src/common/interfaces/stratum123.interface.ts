export interface IStratum123 { 
  noProject: number,
  validity: string,
  idControlSelect:number,
  idConvocatoria:number
}

export interface IItemCreateForm {
    id?: number;
    comuna: string;
    availableResource: number;
    granted: number;
    available: number;
    stake: number;
    legalized: number;
}

export interface IItemUpdateStratum123 {
    comuna?: string;
    availableResource: number;
    granted: number;
    available?: number;
    stake?: number;
    legalized: number;
}