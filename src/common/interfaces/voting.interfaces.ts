import { number } from "yup";

export interface IVotingCreate {
    id?: number;
    communeNeighborhood: number;
    numberProject: number;
    validity: string;
    ideaProject: string;
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

export interface IVotingResultGrid{
    porcentaje456: number;
    porcentaje123: number;
    totalCost: number;
    amount: number;
    activityValue: number;
    directObject: string,
    productCatalog: number
    productCode: number
    program: string
    activity: string
}

export interface IItemCreateRegTable {
    directObject: string,
    productCatalog: number
    productCode: number
    program: string
    activity: string
    porcentaje456: number,
    porcentaje123: number,
    totalCost: number,
    amount: number,
    activityValue: number,

}