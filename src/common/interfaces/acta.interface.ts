import { IActaItems } from "./actaItems.interface";

export interface IActa {
    id?: number;
    numberProject: number;
    periodVigency: number;
    announcementInitial: number;
    salaryMin: number | string;
    costsExpenses: number ;
    OperatorCommission: number;
    financialOperation: number;
    creationDate?: string;
    idStatus: number;
    items?: IActaItems[];
}