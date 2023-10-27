import { IActaItems } from "./actaItems.interface";
import { ICitation } from "./citationInterface";

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
    citation?: ICitation[];  

    dateCitation?: string;
    timeCitation?: string;
    user?: string;
    status?: number;
    idActa?: number;
    dateAprobation?: string;
    email?: string;
}