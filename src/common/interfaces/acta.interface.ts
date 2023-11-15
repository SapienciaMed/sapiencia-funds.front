import { IActaItems } from "./actaItems.interface";
import { ICitation } from "./citationInterface";

export interface IActa {
    id?: number;
    numberProject: number;
    periodVigency: number;
    announcementInitial: string;
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

    tQuantity1?: number;
    tValue1?: number;
    tQuantity2?: number;
    tValue2?: number;
    subtotalVigency?: number;
    totalCostBillsOperation?: number;
    totalNet?: number;
    totalResourcesCredit?: number;
    totalFinancialOperatorCommission?: number;
    vigency1?: number;
    vigency2?: number;
    techo?: number;
}