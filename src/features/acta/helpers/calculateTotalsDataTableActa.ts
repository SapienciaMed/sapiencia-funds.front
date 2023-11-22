import { UseFormSetValue } from 'react-hook-form';
import { IActaItems } from '../../../common/interfaces/actaItems.interface';
import { IActa } from '../../../common/interfaces';
import { Dispatch, SetStateAction } from 'react';

export const calculateTotalsDataTableActa = (items: IActaItems[], setValue: UseFormSetValue<IActa>, 
        setVigency1: Dispatch<SetStateAction<number>>, setSubtotalVigency: Dispatch<SetStateAction<number>>, 
        setTotalQuantityPeriod2: Dispatch<SetStateAction<number>>, setTotalQuantityPeriod1: Dispatch<SetStateAction<number>>) => {

    let totalQuantityPeriod1 = 0;
    let totalValuePeriod1 = 0;
    let totalQuantityPeriod2 = 0;
    let totalValuePeriod2 = 0;
    let totalCostBillsOperation = 0;
    let totalNet = 0;
    let totalFinancialOperatorCommission = 0;
    let totalResourcesCredit = 0;
    let totalSubtotalVigency = 0;

    items?.forEach(item => {
 
        const quantityPeriod1 = parseInt(item.periods?.quantityPeriod1 || '0', 10);
        const valuePeriod1 = parseInt(item.periods?.valuePeriod1 || '0', 10);
        const quantityPeriod2 = parseInt(item.periods?.quantityPeriod2 || '0', 10);
        const valuePeriod2 = parseInt(item.periods?.valuePeriod2 || '0', 10);
        const costBillsOperation = item.costBillsOperation;
        const net = item.net;
        const financialOperatorCommission = item.financialOperatorCommission;
        const resourcesCredit = item.resourcesCredit
        const subtotalVigency = item.subtotalVigency


        totalQuantityPeriod1 += isNaN(quantityPeriod1) ? 0 : quantityPeriod1;
        totalValuePeriod1 += isNaN(valuePeriod1) ? 0 : valuePeriod1;

        totalQuantityPeriod2 += isNaN(quantityPeriod2) ? 0 : quantityPeriod2;
        totalValuePeriod2 += isNaN(valuePeriod2) ? 0 : valuePeriod2;

        totalCostBillsOperation += isNaN(costBillsOperation) ? 0 : costBillsOperation;

        totalNet += isNaN(net) ? 0 : net;

        totalFinancialOperatorCommission += isNaN(financialOperatorCommission) ? 0 : financialOperatorCommission;

        totalResourcesCredit += isNaN(resourcesCredit) ? 0 : resourcesCredit;

        totalSubtotalVigency += isNaN(subtotalVigency) ? 0 : subtotalVigency;
    });

    const vigency1 = totalValuePeriod1 + totalValuePeriod2 + totalCostBillsOperation + totalFinancialOperatorCommission;

    setTotalQuantityPeriod2(totalQuantityPeriod2);
    setTotalQuantityPeriod1(totalQuantityPeriod1);
    setVigency1(vigency1);

    setValue("tQuantity1", totalQuantityPeriod1);
    setValue("tValue1", totalValuePeriod1);
    setValue("tQuantity2", totalQuantityPeriod2);
    setValue("tValue2", totalValuePeriod2);
    setValue("subtotalVigency", totalSubtotalVigency);
    setValue("totalCostBillsOperation", totalCostBillsOperation);
    setValue("totalNet", totalNet);
    setValue("totalResourcesCredit", totalResourcesCredit);
    setValue("totalFinancialOperatorCommission", totalFinancialOperatorCommission);
    setValue("vigency1", vigency1);
    setValue("vigency2", totalSubtotalVigency);
    
    return {
        totalQuantityPeriod1,
        totalValuePeriod1,
        totalQuantityPeriod2,
        totalValuePeriod2,
        totalCostBillsOperation,
        totalNet,
        totalFinancialOperatorCommission,
        totalResourcesCredit,
        totalSubtotalVigency,
        vigency1
    };
};