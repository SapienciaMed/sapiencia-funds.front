import { IActa } from "../../../common/interfaces";

export const dataActasdf = ( dinamicData: IActa[], programList: any[], foundList: any[],lineList: any[], announcementList: any[], conceptList: any[] ) => {
    const processItem = (actaItem: IActa, item?: any, citation?: any) => {
        const citationDate = citation?.dateCitation;
        const citationTime = citation?.timeCitation;
    
        const date = new Date(citationDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
    
        return {
          Estado: actaItem.typeMasterList.name || '',
          Numero_proyecto: actaItem.numberProject || '',
          Periodos_por_vigencia: actaItem.periodVigency || '',
          Convocatoria_inicial: actaItem.announcementInitial || '',
          Salario_minimo: actaItem.salaryMin ? `$${actaItem.salaryMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Costo_gastos_operacion_logistica: actaItem?.costsExpenses ? `${actaItem?.costsExpenses}%` : '',
          Comision_operador_financiero: actaItem?.OperatorCommission ? `${actaItem?.OperatorCommission}%` : '',
          Operacion_financiera_MB: actaItem?.financialOperation ? `${actaItem?.financialOperation}%` : '',
          Control_financiero_Programado: programList.find(
            (option) => option.value === item?.idProgram
          )?.name || '',
          Control_financiero_Fondo: foundList.find(
            (option) => option.value === parseInt(item?.idFound)
          )?.name || '',
          Control_financiero_Linea: lineList.find(
            (option) => option.value === parseInt(item?.idLine)
          )?.name || '',
          Control_financiero_Convocatoria: announcementList.find(
            (option) => option.value === parseInt(item?.idAnnouncement)
          )?.name || '',
          Control_financiero_Concepto: conceptList.find(
            (option) => option.value === parseInt(item?.idConcept)
          )?.name || '',
          Control_financiero_Costo_promedio: item?.costOperation ? `$${item?.costOperation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Control_financiero_CantidadPeriodo1: item?.periods?.quantityPeriod1 || '',
          Control_financiero_ValorPeriodo1: item?.periods?.valuePeriod1 ?  `$${item?.periods?.valuePeriod1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Control_financiero_CantidadPeriodo2: item?.periods?.quantityPeriod2 || '',
          Control_financiero_ValorPeriodo2: item?.periods?.valuePeriod2 ? `$${item?.periods?.valuePeriod2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Control_financiero_Subtotal_vigente: item?.subtotalVigency ? `$${item?.subtotalVigency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Control_financiero_costo_gastos_operacion: item?.costBillsOperation ? `$${item?.costBillsOperation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Control_financiero_neto: item?.net ? `$${item?.net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Control_financiero_operador_finaciero: item?.financialOperatorCommission ? `$${item?.financialOperatorCommission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Control_financiero_recursos_credito: item?.resourcesCredit ? `$${item?.resourcesCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '',
          Citacion_Aprobado: citation?.user || '',
          Citacion_Fecha:
            citationDate != undefined
              ? `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${citationTime}`
              : '',
          Citacion_Estado: citation?.status == 1 ? 'Aprobado' : citation?.status == undefined ? '' : 'No Aprobado',
        };
      };
    
    return dinamicData.flatMap((actaItem: IActa) => {
        const citations = actaItem?.citation.filter((value, index, self) =>
            index ===
            self.findIndex(
            (v) =>
                v.user === value.user &&
                v.timeCitation === value.timeCitation &&
                v.status === value.status
            )
        );

        const items = actaItem.items;

        return citations.length > 0
            ? citations.flatMap((citation) =>
                items.length > 0
                ? items.map((item) => processItem(actaItem, item, citation))
                : [processItem(actaItem,undefined, citation)]
            )
            : items.map((item) => processItem(actaItem, item, citations.flatMap(us => us)));
    });
};