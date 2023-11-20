import { useEffect, useRef } from "react";
import { ITableElement } from "../../../common/interfaces";

export default function useTechnicianStepCashing() {
    
    const tableComponentRef = useRef(null);

    const tableColumns: ITableElement<any>[] = [
        {
            fieldName:'idCredito',
            header: 'Id crédito'
        },
        {
            fieldName:'nroContrato',
            header: 'Nro contrato fiduciario'
        },
        {
            fieldName:'documento',
            header: 'Documento'
        },
        {
            fieldName:'nombreApellido',
            header: 'Nombres y Apellidos'
        },
        {
            fieldName:'Programa',
            header: 'Programa'
        },
        {
            fieldName:'fechaLegalización',
            header: 'Fecha legalización'
        },
        {
            fieldName:'FechaIngresoCorte',
            header: 'Fecha ingreso al corte'
        },
        {
            fieldName:'corte',
            header: 'Corte'
        },
        {
            fieldName:'FechaFinalCorte',
            header: 'Fecha final corte'
        },
        {
            fieldName:'fechaPeriodoGracia',
            header: 'Fecha fin periodo de gracia'
        },
        {
            fieldName:'estado',
            header: 'Estado'
        },
        {
            fieldName:'motivo',
            header: 'Motivo'
        },
        {
            fieldName:'caracterización ',
            header: 'Caracterización'
        },
        {
            fieldName:'responsableActual',
            header: 'Responsable actual'
        }
    ]

    function loadTableData(searchCriteria?: object): void {

        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    useEffect(() => {
        loadTableData()
    }, [])

    return{
        tableComponentRef,
        tableColumns
    }
}