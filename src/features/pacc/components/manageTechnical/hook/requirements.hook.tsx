import { useEffect, useRef } from "react";
import { ITableAction, ITableElement } from "../../../../../common/interfaces";

export default function useRequeriments() {

      
    const tableComponentRef = useRef(null);

    useEffect(() => {
        loadTableData()
    },[])

    const tableColumns: ITableElement<any>[] = [
        {
            fieldName:'number',
            header: 'Número'
        },
        {
            fieldName:'description',
            header: 'Descripción'
        },
        {
            fieldName:'active',
            header: 'Activo'
        },
        {
            fieldName:'percentage',
            header: 'Porcentaje'
        },
        {
            fieldName:'comply',
            header: 'Cumple'
        },
      
    ]
    const tableActions: ITableAction<any>[] = [
        {
            icon: "More",
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
        tableColumns,
        tableComponentRef,
        tableActions,
    }

}