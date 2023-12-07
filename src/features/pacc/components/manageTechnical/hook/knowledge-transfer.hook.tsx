import { useEffect, useRef, useContext, useState } from "react";
import { ITableElement } from "../../../../../common/interfaces";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { FiPaperclip } from "react-icons/fi";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { AppContext } from "../../../../../common/contexts/app.context";
import ManageTransfer from "../manage-transfer";
import { useParams } from "react-router";
import { IApplyKnowledgeTransfer } from "../interface/manage-technical";
import { usePaccServices } from "../../../hook/pacc-serviceshook";
import { EResponseCodes } from "../../../../../common/constants/api.enum";
import { downloadFile } from "../helper/dowloadFile";

export default function useKnowledgeTransfer() {

    const { id } =  useParams()
    const tableComponentRef = useRef(null);
    const toast = useRef(null);
    const { setMessage, authorization } = useContext(AppContext);
    const { GetUploadKnowledgeTransferFiles } = usePaccServices()
    const [ filesService, setFilesService ] = useState([])

    useEffect(() => {
        loadTableData({
            idBeneficiary: parseInt(id),
            user: authorization.user.numberDocument
        })
        getUploadKnow()
    },[])

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    function getUploadKnow(): void {
        GetUploadKnowledgeTransferFiles(id).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                setFilesService(response.data)
            }
        })
    }

    const tableColumns: ITableElement<IApplyKnowledgeTransfer>[] = [
       {
            fieldName:'committedHours',
            header: 'Horas Comprometidas',
       },
       {
            fieldName:'workedHours',
            header: 'Horas realizadas'
       },
        {
            fieldName:'pendingHours',
            header: 'Horas pendientes'
        },
        {
            fieldName:'status',
            header: 'Estado',
            renderCell:(row) => {
                return( <Tag severity={row.status == 0 ? 'danger' : 'success'} value={row.status == 1 ? 'Aprobado': 'Rechazado'} rounded/> )
            }
        },
        {
            fieldName:'observations',
            header: 'Observación',
            renderCell:(row) => {
                return(
                    <>
                        <Tooltip target=".observation" style={{ borderRadius: "1px" }} />
                        <i
                            className="style-tooltip observation"
                            data-pr-tooltip={row.observations}
                            data-pr-position="bottom"
                        >
                           { row.observations }
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
                                data-pr-tooltip="Gestionar"
                                data-pr-position="left"
                            >
                                <Button 
                                    className="button-table2"  
                                    icon={ 
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                            d="M11.5133 14.2083H1.375C0.896667 14.2083 0.5 13.8117 0.5 13.3333C0.5 12.855 0.896667 12.4583 1.375 12.4583H11.5133L9.50667 10.4517C9.16833 10.1133 9.16833 9.55332 9.50667 9.21499C9.845 8.87666 10.405 8.87666 10.7433 9.21499L14.2433 12.715C14.325 12.7967 14.3833 12.89 14.43 12.995C14.5233 13.205 14.5233 13.45 14.43 13.66C14.3833 13.765 14.325 13.8583 14.2433 13.94L10.7433 17.44C10.5683 17.615 10.3467 17.6967 10.125 17.6967C9.90333 17.6967 9.68167 17.615 9.50667 17.44C9.16833 17.1017 9.16833 16.5417 9.50667 16.2033L11.5133 14.1967V14.2083ZM21.5 8.08332V18C21.5 19.7733 20.065 21.2083 18.2917 21.2083H9.54167C7.76833 21.2083 6.33333 19.7733 6.33333 18V16.8333C6.33333 16.355 6.73 15.9583 7.20833 15.9583C7.68667 15.9583 8.08333 16.355 8.08333 16.8333V18C8.08333 18.805 8.73667 19.4583 9.54167 19.4583H18.2917C19.0967 19.4583 19.75 18.805 19.75 18V8.95832H14.2083C13.73 8.95832 13.3333 8.56166 13.3333 8.08332V2.54166H9.54167C8.73667 2.54166 8.08333 3.19499 8.08333 3.99999V9.83332C8.08333 10.3117 7.68667 10.7083 7.20833 10.7083C6.73 10.7083 6.33333 10.3117 6.33333 9.83332V3.99999C6.33333 2.22666 7.76833 0.791656 9.54167 0.791656H14.2083C14.4417 0.791656 14.6633 0.88499 14.8267 1.04832L21.2433 7.46499C21.4067 7.62832 21.5 7.84999 21.5 8.08332ZM15.0833 7.20832H18.5133L15.0833 3.77832V7.20832Z"
                                            fill="black"
                                            />
                                      </svg>
                                    }
                                    onClick={() => {
                                        setMessage({
                                            show: true,
                                            title: "Gestionar",
                                            description: <ManageTransfer idSelect={row.id} loadTableData={loadTableData} idBeneficiary={row.idBeneficiary} getUploadKnow={getUploadKnow}/>,
                                            background: true,
                                        });
                                    }} 
                                    
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
                                    <Menu model={items(row.idBeneficiary)} className="menu-style"/>
                                </OverlayPanel>
                                
                            </i>
                            
                        </section>
                    </div>
                )
            }
        }
    ]

    const items = (row): MenuItem[] => [
        {
            label: "Ver documentos",
            items: filesService.length > 0 ? filesService.map((file) => {
                return {
                  label: file.name,
                  icon: '', // Puedes asignar un icono si es necesario
                  template: () => {
                    return (
                      <button 
                        className="p-menuitem-link button-menu-tooltip"
                        onClick={()=>{
                            downloadFile(file, authorization, setMessage )
                        }}
                      >
                        <span className="p-menuitem-text ml-5px">{file.name}</span>
                      </button>
                    );
                  },
                };
              }) : [{
                label: "No hay adjunto",
                icon: '',        
              }],
              
        },
    ]

    return {
        tableComponentRef,
        tableColumns,
    }
}