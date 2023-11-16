import { IActa } from "../../../common/interfaces";

export const dataActasdf = ( dinamicData: IActa[]) => {

    const data = dinamicData.map((item: IActa) => {
        return {
            Estado: item.typeMasterList.name,
            Numero_proyecto: item.numberProject,
            Periodos_por_vigencia: item.periodVigency,
            Convocatoria_inicial: item.announcementInitial,
            Salario_minimo: item.salaryMin,
            Costo_gastos_operacion_logistica: item.costsExpenses,
            Comision_operador_financiero: item.OperatorCommission,
            Operacion_financiera_MB: item.financialOperation,
            Control_financiero_Programado: item.items.find(u => u)?.idProgram,
            Control_financiero_Fondo: item.items.find(u => u)?.idFound,
            Control_financiero_Linea: item.items.find(u => u)?.idLine,
            Control_financiero_Convocatoria: item.items.find(u => u)?.idAnnouncement,
            Control_financiero_Concepto: item.items.find(u => u)?.idConcept,
            Control_financiero_Costo_promedio: item.items.find(u => u)?.costOperation,
            Control_financiero_CantidadPeriodo1: item.items.find((item) => item.periods.quantityPeriod1 !== undefined && item.periods.quantityPeriod1 !== null).periods.quantityPeriod1,
            Control_financiero_ValorPeriodo1: item.items.find((item) => item.periods.quantityPeriod1 !== undefined && item.periods.quantityPeriod1 !== null).periods.valuePeriod1,
            Control_financiero_CantidadPeriodo2: item.items.find((item) => item.periods.quantityPeriod1 !== undefined && item.periods.quantityPeriod1 !== null).periods.quantityPeriod2,
            Control_financiero_ValorPeriodo2: item.items.find((item) => item.periods.quantityPeriod1 !== undefined && item.periods.quantityPeriod1 !== null).periods.valuePeriod2,
            Control_financiero_Subtotal_vigente: item.items.find(u => u)?.subtotalVigency,
            Control_financiero_costo_gastos_operacion: item.items.find(u => u)?.costOperation,
            Control_financiero_neto: item.items.find(u => u)?.net,
            Control_financiero_operador_finaciero: item.items.find(u => u)?.financialOperatorCommission,
            Control_financiero_recursos_credito: item.items.find(u => u)?.resourcesCredit,
            Citacion_Aprobado: item?.citation.filter((value, index, self) =>
                index === self.findIndex((v) => (
                    v.user === value.user &&
                    v.timeCitation === value.timeCitation &&
                    v.status === value.status
                ))
            ).find(us => us)?.user,
            Citacion_Fecha: item?.citation.filter((value, index, self) =>
                index === self.findIndex((v) => (
                    v.user === value.user &&
                    v.timeCitation === value.timeCitation &&
                    v.status === value.status
                ))
            ).find(us => us)?.dateCitation,
            Citacion_Estado: item?.citation.filter((value, index, self) =>
                index === self.findIndex((v) => (
                    v.user === value.user &&
                    v.timeCitation === value.timeCitation &&
                    v.status === value.status
                ))
            ).find(us => us)?.status == 1 ? 'No Aprobado': 'Aprobado',
        }
    })

    return data;

}