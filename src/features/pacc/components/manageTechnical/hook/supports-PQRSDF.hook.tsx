import { useContext, useEffect, useRef } from "react";
import { ITableAction, ITableElement } from "../../../../../common/interfaces";
import { PqrsdfResultSimple } from "../interface/manage-technical";
import { Tooltip } from "primereact/tooltip";
import { downloadFile } from "../helper/dowloadFile";
import { IFiles } from "../../../../../common/interfaces/storage.interfaces";
import { AppContext } from "../../../../../common/contexts/app.context";

export default function useSupportsPQRSDF({ document }) {
    
    const tableComponentRef = useRef(null);
    const { setMessage, authorization } = useContext(AppContext);

    useEffect(() => {
        loadTableData({ identification: document })
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
                const file: IFiles = {
                    name: 'test5.pdf',
                    path: ' sapiencia-citizen-attention/proyectos-digitales/test5.pdf',
                }
                downloadFile(file, authorization, setMessage, '/consolidation-tray/get-pqrsdf-external')
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