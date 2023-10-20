export interface IActaItems {
    id?: number;
    found?: string;
    line?: string;
    announcement?: string;
    concept?: string;
    costOperation?: string;
    periods?: string;
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

    averageCost?: {
        quantityPeriod1?: string;
        valuePeriod1? : string;
        quantityPeriod2?: string;
        valuePeriod2?: string;
    };
    //idActa: number;
}

