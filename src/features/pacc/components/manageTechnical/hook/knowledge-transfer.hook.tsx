import { useEffect, useRef } from "react";
import { ITableElement } from "../../../../../common/interfaces";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { FaEye } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";

export default function useKnowledgeTransfer() {
    
    const tableComponentRef = useRef(null);
    const toast = useRef(null);

    useEffect(() => {
        loadTableData()
    },[])

    const tableColumns: ITableElement<any>[] = [
       {
            fieldName:'committedHours',
            header: 'Horas Comprometidas',
       },
       {
            fieldName:'hoursPerformed',
            header: 'Horas realizadas'
       },
        {
            fieldName:'pendingHours',
            header: 'Horas pendientes'
        },
        {
            fieldName:'state',
            header: 'Estado',
            renderCell:(row) => {
                return( <Tag severity={row.state == 'Rechazado' ? 'danger' : 'success'} value={row.state} rounded/> )
            }
        },
        {
            fieldName:'observation',
            header: 'Observación',
            renderCell:(row) => {
                return(
                    <>
                        <Tooltip target=".observation" style={{ borderRadius: "1px" }} />
                        <i
                            className="style-tooltip observation"
                            data-pr-tooltip={row.observation}
                            data-pr-position="bottom"
                        >
                           { row.observation }
                        </i>
                    </>
                )
            }
        },
        {
            fieldName:'actions',
            header: 'Acciones',
            renderCell:(row) => {
                return(
                    <div className="content-tooltip">
                        <section className="card-options">
                            <Tooltip target=".revisar" style={{ borderRadius: "1px" }} />
                            <i
                                className="style-tooltip revisar"
                                data-pr-tooltip="Revisar"
                                data-pr-position="left"
                            >
                                <Button 
                                    className="button-table2"  
                                    icon={ <FaEye className="button grid-button button-detail" /> } 
                                    
                                />
                            </i>
                        </section>
                        <section className="card-options">
                            <Tooltip target=".adjunto" style={{ borderRadius: "1px" }} />
                            <i
                                className="style-tooltip adjunto"
                                data-pr-tooltip="Adjuntar"
                                data-pr-position="right"
                            >
                                <Button 
                                    className="button-table" 
                                    icon={<FiPaperclip className="icon-size"/>} 
                                    onClick={(e) => toast.current.toggle(e)} 
                                />
                                
                                <OverlayPanel ref={toast}>
                                    <Menu model={items(row.idBeneficiary)}/>
                                </OverlayPanel>
                                
                            </i>
                            
                        </section>
                    </div>
                )
            }
        }
    ]

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    const items = (row): MenuItem[] => [

    ]

    return {
        tableComponentRef,
        tableColumns
    }
}