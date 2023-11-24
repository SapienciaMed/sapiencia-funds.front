import { useEffect, useRef } from "react";
import { ITableAction, ITableElement } from "../../../../../common/interfaces";

export default function useSupportsPQRSDF() {
    
    const tableComponentRef = useRef(null);

    useEffect(() => {
        loadTableData()
    },[])


    const tableColumns: ITableElement<any>[] = [
        {
            fieldName:'noPQRSDF',
            header: 'No. PQRSDF'
        },
        {
            fieldName: 'fechaRadicado',
            header: 'Fecha radicado'
        },
        {
            fieldName: 'programa',
            header: 'Programa'
        },
        {
            fieldName: 'asunto',
            header: 'Asunto'
        },
        {
            fieldName: 'estado',
            header: 'Estado'
        },
        {
            fieldName: 'fechaRespuesta',
            header: 'Fecha respuesta'
        },
        {
            fieldName: 'respuesta',
            header: 'Respuesta',
        }
    ]
    const tableActions: ITableAction<any>[] = [
        {
            icon: "download",
            onClick: (row) => {

            },
        },
       
    ];


    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    return{
        tableComponentRef,
        tableColumns,
        tableActions
    }
}