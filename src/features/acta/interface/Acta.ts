export interface IActaSearch{
    actaNro: string;
}

export interface ISearchResultProp {
    valueAction?: "edit";
}

export interface ISearchResult {
    consecutiveNroPrevious: string,
    consecutiveNro: string,
    projectNumber: string,
    periodVigency: string
    initialCall: string,
    minimumSalary: string,
    costAndLogistics: number,
    financialOperator: number,
    financialTransactionMB: number,
    tQuantity1: string,
    tValue1: string,
    tQuantity2: string,
    tValue2: number,
    subtotalVigency: number,
    totalCostBillsOperation: number,
    totalNet: number,
    totalResourcesCredit: number,
    totalFinancialOperatorCommission: number,
    vigency1: number,
    vigency2: number,
    techo: number,
    
}