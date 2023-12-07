import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { ITableElement } from "../../../../../common/interfaces";
import { MenuItem } from "primereact/menuitem";
import { AppContext } from "../../../../../common/contexts/app.context";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { Tooltip } from "primereact/tooltip";
import { FiPaperclip } from "react-icons/fi";
import { Button } from "primereact/button";
import * as IconFI from "react-icons/fi"
import { IRequerimentsResultSimple } from "../interface/manage-technical";
import { usePaccServices } from "../../../hook/pacc-serviceshook";
import { EResponseCodes } from "../../../../../common/constants/api.enum";
import { useNavigate, useParams } from "react-router-dom";
import CheckboxMui from "@mui/material/Checkbox";
import { downloadFile } from "../helper/dowloadFile";
import { ProgressSpinner } from "primereact/progressspinner";
import { uploadFiles } from "../helper/uploadFile";

export default function useRequeriments() {
      
    const { id } =  useParams()
    const navigate = useNavigate();
    const tableComponentRef = useRef(null);
    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);
    const { GetRequirementsByBeneficiary, GetRequirementFile, ComplianceAssignmentBeneficiary, DeleteUploadFiles } = usePaccServices()
    const [filesUploadData, setFilesUploadData] = useState<File>(null);
    const { setMessage, setDisabledFields, authorization } = useContext(AppContext);
    const [ idBeneficiary, setIdBeneficiary] = useState('')
    const [showTable, setShowTable] = useState(false);
    const [ showSpinner, setShowSpinner ] = useState(false)
    const [ idCode, setIdCode ] = useState('')
   

    const initialStateCheck = {
        checked: [],
        unchecked: [],
    };    
    const [stateCheck, setStateCheck] = useState(initialStateCheck);

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    useEffect(() => {
        stateCheck != initialStateCheck && setDisabledFields(true)
    },[stateCheck])

    useEffect(() => {
        if (filesUploadData != null) {
            //Guarda el archivo
            uploadFiles(idCode, [filesUploadData], setMessage, loadTableData, authorization)
        }
    },[filesUploadData])

    useEffect(() => {
        GetRequirementsByBeneficiary({ idBeneficiary: id }).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                setShowTable(true)
                loadTableData({idBeneficiary: parseInt(id)})
            }else {
                setShowTable(false)
            }
        })

        return () => {
            setDisabledFields(false)
            setStateCheck(initialStateCheck)
        }
    },[])

    const tableColumns: ITableElement<IRequerimentsResultSimple>[] = [
        {
            fieldName:'descriptionRequirement',
            header: 'Descripción',
            renderCell:(row) => {
                return(
                    <>
                        <Tooltip target=".respuesta" style={{ borderRadius: "1px" }} />
                       
                        <i
                            className="style-tooltip respuesta"
                            data-pr-tooltip={row.descriptionRequirement}
                            data-pr-position="bottom"
                        >
                           { row.descriptionRequirement }
                        </i>
                    </>
                )
            }
        },
        {
            fieldName:'activeRequirement',
            header: 'Activo',
            renderCell:(row) => {
                return (
                    <div> { row.activeRequirement ? 'SI' : 'NO' } </div>
                );
            },
        },
        {
            fieldName:'mandatoryFor',
            header: 'Obligatorio para',
            renderCell:(row) => {
                return(
                    <> { row.mandatoryFor ? `${row.mandatoryFor}` : 'N/A' } </>
                )
            }
        },
        {
            fieldName:'accomplished',
            header: 'Cumple',
            renderCell:(row) => {
                return(
                    <div >
                       <CheckboxMui
                            className="checkbox-customer"
                            name="row" 
                            value={row}  
                            onChange={(event) => { onAmountChange(row, event) }} 
                            defaultChecked={row.accomplished == 1}
                        />
                    </div>

                )
            },
        },
        {
            fieldName:'number',
            header: 'Acciones',
            renderCell:(row) => {
                return(
                    <div className="card-header">
                        <div className="card-options">
                            <Tooltip target=".adjunto" style={{ borderRadius: "1px" }} />
                            <i
                                className="style-tooltip adjunto"
                                data-pr-tooltip="Adjuntar"
                                data-pr-position="right"
                            >
                                <Button className="button-table" icon={<FiPaperclip className="icon-size"/>} 
                                    onClick={(e) => {
                                        toast.current.toggle(e);
                                        setIdBeneficiary(String(row.idBeneficiary))
                                        setIdCode(String(row.id))  
                                    }} 
                                />
                                
                                <OverlayPanel ref={toast}>
                                    <Menu model={items()}/>
                                </OverlayPanel>
                                
                            </i>
                           
                        </div>
                    </div>
                )
            }
        }
      
    ]

    const items = (): MenuItem[] => [
        {
            label: 'Adjuntar archivo',
            items: [
                {
                    label: 'Adjuntar',
                    icon: 'pi pi-paperclip',
                    template:() => {
                        return(
                            <button className='p-menuitem-link button-menu-tooltip'
                                onClick={() => {
                                    setVisible(true);
                                    toast.current.hide();
                                }}
                            >
                                <IconFI.FiPaperclip/>
                                <span className="p-menuitem-text ml-5px"> Adjuntar</span>
                            </button>
                        )
                    }              
                },
                {
                    label: 'Ver adjunto',
                    icon: 'pi pi-eye',
                    template:() => {
                        return(
                            <button className="p-menuitem-link button-menu-tooltip" 
                                onClick={() => {
                                    setShowSpinner(true)
                                    idCode && GetRequirementFile(idCode).then(response => {
                                        if(response.operation.code === EResponseCodes.OK){
                                           if (response.data.length == 0) {
                                               setMessage({
                                                    show: true,
                                                    title: "Ver adjunto",
                                                    description: 'No hay adjunto para visualizar',
                                                    background: true,
                                                    OkTitle: 'Aceptar',
                                                    onOk() {
                                                        setMessage({});
                                                    },
                                                });
                                           }else {
                                            downloadFile(response.data[0], authorization, setMessage )
                                           }
                                            setShowSpinner(false)
                                            toast.current.hide();
                                        }else{
                                            setShowSpinner(false)
                                        }
                                    }).catch(error => {
                                        setShowSpinner(false)
                                        console.log(error)
                                    })
                                }}
                            >
                                <IconFI.FiEye/>
                                <span className="p-menuitem-text ml-5px"> Ver adjunto</span>
                                {
                                   showSpinner &&  <ProgressSpinner style={{width: '15px', height: '15px'}}  animationDuration=".5s" />
                                }
                            </button>
                        )
                    }   
                },
                {
                    label: 'Quitar adjunto',
                    icon: 'pi pi-trash',
                    template:() => {
                        return(
                            <button className="p-menuitem-link button-menu-tooltip" 
                                onClick={() => { deleteFile()}}
                            >
                                <IconFI.FiTrash2/>
                                <span className="p-menuitem-text ml-5px"> Quitar adjunto</span>
                            </button>
                        )
                    }   
                }
                
            ]
        },
    ];

    const deleteFile = () => {
        toast.current.hide();
        idCode && GetRequirementFile(idCode).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                if (response.data.length == 0) {
                    setMessage({
                        show: true,
                        title: "Eliminar",
                        description: 'No hay adjunto para eliminar',
                        background: true,
                        OkTitle: 'Aceptar',
                        onOk() {
                            setMessage({});
                        },
                    });
                }else {
                    setMessage({
                        show: true,
                        title: "Quitar adjunto",
                        description: '¿Estás segur@ de quitar el adjunto?, no se podrá recuperar.',
                        background: true,
                        OkTitle: 'Aceptar',
                        cancelTitle: 'Cancelar',
                        onOk() {
                            DeleteUploadFiles(idCode, idBeneficiary).then(response => {
                                if(response){
                                    setMessage({
                                        show: true,
                                        title: "Eliminar",
                                        description: 'Archivo eliminado correctamente',
                                        background: true,
                                        OkTitle: 'Aceptar',
                                        onOk() {
                                            setMessage({});
                                            loadTableData()
                                        },
                                        onClose() {
                                            setMessage({});
                                            loadTableData()
                                        },
            
                                    });
                                }else {
                                    setMessage({
                                        show: true,
                                        title: "Eliminar",
                                        description: response.operation.message,
                                        background: true,
                                        OkTitle: 'Aceptar',
                                        onOk() {
                                            setMessage({});
                                            
                                        },
                                    });
                                }
                            
                            })
                            setMessage({});
                        },
                        onClose() {
                            setMessage({});
                        },
                    });
                }
            } 
        })
      
    }

    const onAmountChange = (value: IRequerimentsResultSimple, event: ChangeEvent<HTMLInputElement>) => {
        const { checked, unchecked } = stateCheck;
        const serviceCompliance = value.accomplished === 1;
        const isUnchecked = event.target.checked;
        const index = unchecked.findIndex(({ idRequirement }) => idRequirement === value.id);
      
        const updatedChecked = checked.filter(({ idRequirement }) => idRequirement !== value.id);
        const updatedUnchecked = unchecked.filter(({ idRequirement }) => idRequirement !== value.id);
      
        if (event.target.checked && !serviceCompliance) {
          updatedChecked.push({
            idRequirementConsolidate: value.id,
            newStatus: true,
          });
        } else if (serviceCompliance && !isUnchecked && index === -1) {
          updatedUnchecked.push({
            idRequirementConsolidate: value.id,
            newStatus: false,
          });
        }
      
        setStateCheck({ checked: updatedChecked, unchecked: updatedUnchecked });
    };

    const onCancel = () => {
        setMessage({
            show: true,
            title: "Cancelar",
            description: "¿Segur@ que deseas cancelar",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                setMessage((prev) => ({ ...prev, show: false }));
                navigate('/fondos/pacc/bandeja-consolidacion')  
            },
            background: true,
          });
        
    }

    const saveFile = () => {
        const arrayAssigmentBeneficiary = [...stateCheck.checked, ...stateCheck.unchecked];

        setMessage({
            show: true,
            title: "Requisitos",
            description: "¿Estás segur@ de guardar la información de requisitos?",
            cancelTitle: "Cancelar",
            OkTitle: "Aceptar",
            onOk() {
                ComplianceAssignmentBeneficiary(arrayAssigmentBeneficiary).then(response => {
                    setMessage({})
                    if(response.operation.code === EResponseCodes.OK){
                        setDisabledFields(false)
                        setMessage({
                            OkTitle: "Aceptar",
                            description: "¡Cambios guardados exitosamente!",
                            title: "Guardar",
                            show: true,
                            type: EResponseCodes.OK,
                            background: true,
                            onOk() { 
                                setMessage({});
                                loadTableData()
                            },
                            onClose() {
                                setMessage({});
                                loadTableData()
                            },
                        });
                    }
                }).catch(error => {
                    console.log(error)
                    setDisabledFields(false)
                })
            },
            background: true,
        });
    }

    return{
        tableColumns,
        tableComponentRef,
        visible,
        showTable,
        setVisible,
        setFilesUploadData,
        onCancel,
        saveFile
    }

}