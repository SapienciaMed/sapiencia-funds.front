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
import { useParams } from "react-router-dom";
import CheckboxMui from "@mui/material/Checkbox";

export default function useRequeriments() {
      
    const { id } =  useParams()
    const tableComponentRef = useRef(null);
    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);
    const {GetRequirementsByBeneficiary} = usePaccServices()
    const [filesUploadData, setFilesUploadData] = useState<File>(null);
    const { setMessage } = useContext(AppContext);
    const [filesUploadDataWithId, setFilesUploadDataWithId] = useState<any[]>([]);
    const [idSelect, setIdSelect] = useState('')
    const [showTable, setShowTable] = useState(false);

    const initialStateCheck = {
        checked: [],
        unchecked: [],
    };    
    const [stateCheck, setStateCheck] = useState(initialStateCheck);

    useEffect(() => {
        stateCheck && console.log('Enviar estado.');
    },[stateCheck])

    /* Lo que es el archivo(s) cargado(s) aca y el cambio de check si cumple, se debe enviar al componente 
        TabsManageTechnical con un redux, ya que este es el que se va a encargar del guardado de todas las pestañas y los cambios que se hagan en ella, 
        *** En el momento no se esta haciendo la carga de archivo  ***
    */

    useEffect(() => {
        if (filesUploadData != null) {
            // Inicializar filesUploadDataWithId como un array vacío si es null
            const currentFilesUploadDataWithId = filesUploadDataWithId || [];
    
            // Verificar si el id ya existe en filesUploadDataWithId
            const index = currentFilesUploadDataWithId?.findIndex(item => item.id === idSelect);
    
            if (index !== -1) {
                // Si el id ya existe, actualizar el elemento existente
                const updatedFilesUploadDataWithId = [...currentFilesUploadDataWithId];
                updatedFilesUploadDataWithId[index] = {
                    file: filesUploadData,
                    id: idSelect
                };
                setFilesUploadDataWithId(updatedFilesUploadDataWithId);
            } else {
                // Si el id no existe, agregar un nuevo elemento
                setFilesUploadDataWithId(prevState => [
                    ...prevState,
                    {
                        file: filesUploadData,
                        id: idSelect
                    }
                ]);
            }
        }
    },[filesUploadData])

    useEffect(() => {
        GetRequirementsByBeneficiary({ idBeneficiary: id }).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                setShowTable(true)
                loadTableData()
            }else {
                setShowTable(false)
            }
        })
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
                    <div>
                        {
                            row.activeRequirement ? 'SI' : 'NO'
                        }
                    </div>
                );
            },
        },
        {
            fieldName:'percentage',
            header: 'Porcentaje',
            renderCell:(row) => {
                return(
                    <>
                        {
                            row.percentRequirement ? `${row.percentRequirement}%` : 'N/A'
                        } 
                    </>
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
                                        setIdSelect(String(row.idBeneficiary))  
                                    }} 
                                />
                                
                                <OverlayPanel ref={toast}>
                                    <Menu model={items(row.idBeneficiary)}/>
                                </OverlayPanel>
                                
                            </i>
                           
                        </div>
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
        {
            label: 'Adjuntar archivo',
            items: [
                {
                    label: 'Adjuntar',
                    icon: 'pi pi-paperclip',
                    template:() => {
                        return(
                            <button className='p-menuitem-link button-menu-tooltip disabled-component'
                                onClick={() => {
                                    setVisible(true);
                                    toast.current.hide();
                                }}
                                disabled //Se dejara bloqueado, mientras se termina de implementar la subida de archivo
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
                            <button className="p-menuitem-link button-menu-tooltip disabled-component" 
                                onClick={() => showFile() }
                                disabled //Se dejara bloqueado, mientras se termina de implementar la subida de archivo
                            >
                                <IconFI.FiEye/>
                                <span className="p-menuitem-text ml-5px"> Ver adjunto</span>
                            </button>
                        )
                    }   
                },
                {
                    label: 'Quitar adjunto',
                    icon: 'pi pi-trash',
                    template:() => {
                        return(
                            <button className="p-menuitem-link button-menu-tooltip disabled-component" 
                                onClick={() => { deleteFile()}}
                                disabled //Se dejara bloqueado, mientras se termina de implementar la subida de archivo
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

    const showFile = () => {
        if (filesUploadData) {
            const primerArchivo = filesUploadData;
            const archivoURL = URL.createObjectURL(primerArchivo);

            const ventanaNueva = window.open('', '_blank');

            if (ventanaNueva) {
                ventanaNueva.location.href = archivoURL;
            } else {
                console.error('No se pudo abrir la nueva pestaña.');
            }

            URL.revokeObjectURL(archivoURL);
        }else {
            toast.current.hide();
            setMessage({
                show: true,
                title: "Ver adjunto",
                description: 'No hay archivo para visualizar',
                background: true,
                onOk() {
                    setMessage({});
                },
            });
        }
    }

    const deleteFile = () => {
        const updatedFilesUploadDataWithId = filesUploadDataWithId.filter(item => item.id !== idSelect);
        setFilesUploadDataWithId(updatedFilesUploadDataWithId);

        toast.current.hide();
        setMessage({
            show: true,
            title: "Eliminar",
            description: 'Archivo eliminado',
            background: true,
            onOk() {
                setMessage({});
            },
        });
    }

    const onAmountChange = (value: IRequerimentsResultSimple, event: ChangeEvent<HTMLInputElement>) => {
        const { checked, unchecked } = stateCheck;
        const serviceCompliance = value.accomplished === 1;
        const isUnchecked = event.target.checked;
        const index = unchecked.findIndex(({ idRequirement }) => idRequirement === value.idRequirement);
      
        const updatedChecked = checked.filter(({ idRequirement }) => idRequirement !== value.idRequirement);
        const updatedUnchecked = unchecked.filter(({ idRequirement }) => idRequirement !== value.idRequirement);
      
        if (event.target.checked && !serviceCompliance) {
          updatedChecked.push({
            idRequirement: value.idRequirement,
            idBeneficiary: value.idBeneficiary,
            accomplished: 1,
          });
        } else if (serviceCompliance && !isUnchecked && index === -1) {
          updatedUnchecked.push({
            idRequirement: value.idRequirement,
            idBeneficiary: value.idBeneficiary,
            accomplished: 0,
          });
        }
      
        setStateCheck({ checked: updatedChecked, unchecked: updatedUnchecked });
    };

    // const saveFile = () => {

    // }

    return{
        tableColumns,
        tableComponentRef,
        visible,
        id,
        showTable,
        setVisible,
        setFilesUploadData,
    }

}