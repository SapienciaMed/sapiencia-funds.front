export interface IActaItems {
    id?: number;
    found?: string;
    line?: string;
    announcement?: string;
    concept?: string;
    costOperation?: string;   
    subtotalVigency?: number;
    costBillsOperation?: number;
    net?: number;
    financialOperatorCommission?: number;
    resourcesCredit?: number; 
    program?: string;
    
    quantityPeriod1?: string;
    valuePeriod1? : string;
    quantityPeriod2?: string;
    valuePeriod2?: string;

    periods?: {
        quantityPeriod1?: string;
        valuePeriod1? : string;
        quantityPeriod2?: string;
        valuePeriod2?: string;
    };
    //idActa: number;
    ident?: string;
    idFound?:string;
    idLine?: string;
    idProgram?: string;
    idAnnouncement?: string;
    idConcept?: string;
}

