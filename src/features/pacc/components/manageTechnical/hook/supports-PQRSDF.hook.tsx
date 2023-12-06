import { useEffect, useRef, useState } from "react";
import { ITableAction, ITableElement } from "../../../../../common/interfaces";
import { useParams } from "react-router-dom";
import { PqrsdfResultSimple } from "../interface/manage-technical";
import { Tooltip } from "primereact/tooltip";

export default function useSupportsPQRSDF() {
    
    const tableComponentRef = useRef(null);

    useEffect(() => {
        loadTableData()
    },[])


    const tableColumns: ITableElement<PqrsdfResultSimple>[] = [
        {
            fieldName:'numberPqrsdf',
            header: 'No. PQRSDF'
        },
        {
            fieldName: 'dateFiled',
            header: 'Fecha radicado',
            renderCell:(row) => {
                const date = new Date(row.dateFiled);
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1;
                const year = date.getUTCFullYear();

                return(
                    <div>
                        {day < 10 ? '0' + day :  day}/{ month < 10 ? '0'+ month :  month }/{year}
                    </div>
                )
            }
        },
        {
            fieldName: 'program',
            header: 'Programa'
        },
        {
            fieldName: 'reason',
            header: 'Asunto'
        },
        {
            fieldName: 'state',
            header: 'Estado'
        },
        {
            fieldName: 'answerDate',
            header: 'Fecha respuesta',
            renderCell:(row) => {
                const date = new Date(row.answerDate);
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1;
                const year = date.getUTCFullYear();

                return(
                    <div>
                        {day < 10 ? '0' + day :  day}/{ month < 10 ? '0'+ month :  month }/{year}
                    </div>
                )
            }
        },
        {
            fieldName: 'answer',
            header: 'Respuesta',
            renderCell:(row) => {
                return(
                    <>
                        <Tooltip target=".respuesta" style={{ borderRadius: "1px" }} />
                        <i
                            className="style-tooltip respuesta"
                            data-pr-tooltip={row.answer}
                            data-pr-position="bottom"
                        >
                        {row.answer}
                        </i>
                    </>
                )
            }
        }
    ]
    const tableActions: ITableAction<any>[] = [
        {
            icon: "Paperclip",
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
        tableActions,
    }
}