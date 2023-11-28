import { useContext, useEffect, useRef, useState } from "react";
import { ITableAction, ITableElement } from "../../../../../common/interfaces";
import { MenuItem } from "primereact/menuitem";
import { AppContext } from "../../../../../common/contexts/app.context";
import { FaEllipsisH } from "react-icons/fa";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { Tooltip } from "primereact/tooltip";
import { Checkbox } from "primereact/checkbox";
import { FiPaperclip } from "react-icons/fi";
import { Button } from "primereact/button";

interface IProp{
    number: number,
    description: string,
    active: string,
    percentage: string,
    comply: true
}

export default function useRequeriments() {
      
    const tableComponentRef = useRef(null);
    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [filesUploadData, setFilesUploadData] = useState<File[]>([]);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const { setMessage } = useContext(AppContext);
    const [selectedAmounts, setSelectedAmounts] = useState([]);

    //TODO: Lo que es el archivo(s) cargado(s) aca y el cambio de check si cumple, se debe enviar al componente TabsManageTechnical ya que este es el que se va a encargar del guardado de todas las pestañas y los cambios que se hagan en ella

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
            header: 'Descripción',
            renderCell:(row) => {
                return(
                    <>
                        <Tooltip target=".respuesta" style={{ borderRadius: "1px" }} />
                        <i
                            className="style-tooltip respuesta"
                            data-pr-tooltip={row.description}
                            data-pr-position="bottom"
                        >
                            {row.description}
                        </i>
                    </>
                )
            }
        },
        {
            fieldName:'active',
            header: 'Activo'
        },
        {
            fieldName:'percentage',
            header: 'Porcentaje',
            renderCell:(row) => {
                return(
                    <>
                        {
                            row.percentage ? `${row.percentage}%` : 'N/A'
                        } 
                    </>
                )
            }
        },
        {
            fieldName:'comply',
            header: 'Cumple',
            renderCell:(row) => {
                return(
                    <div >
                       <Checkbox 
                            inputId={row?.number} 
                            name="row" 
                            value={row}  
                            onChange={onAmountChange} 
                            checked={selectedAmounts?.some((item) => item?.number == row?.number) }
                        />
                    </div>

                )
            },
        },
        {
            fieldName:'action',
            header: 'Acciones',
            renderCell:(row) => {

                return(
                    <div className="card-header">
                        <div className="card-options">
                            <Tooltip target=".adjunto" style={{ borderRadius: "1px" }} />
                            <i
                                className="style-tooltip adjunto"
                                data-pr-tooltip="Adjunto"
                                data-pr-position="left"
                            >
                                <Button className="button-table" icon={<FiPaperclip/>} onClick={(e) => toast.current.toggle(e)} />
                                
                                <OverlayPanel ref={toast}>
                                    <Menu model={items} />
                                </OverlayPanel>
                                
                            </i>
                           
                        </div>
                    </div>
                )
            }
        }
      
    ]

    const tableActions: ITableAction<any>[] = [
        {
            icon: "Paperclip",
            onClick: (row) => {
                // toast.current.toggle(e)
                
            },
        },
       
    ];

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    const handleFileNameChange = (fileName) => {
        setUploadedFileName(fileName);
      };

    const items: MenuItem[] = [
        {
            label: 'Adjuntar archivo',
            items: [
                {
                    label: 'Adjuntar',
                    icon: 'pi pi-paperclip',
                    command: () =>{
                        setVisible(true);
                        toast.current.hide();
                    },                 
                },
                {
                    label: 'Ver adjunto',
                    icon: 'pi pi-eye',
                    command: () => {
                        showFile()
                    },
                },
                {
                    label: 'Quitar adjunto',
                    icon: 'pi pi-trash',
                    command: () => {

                    },
                }
                
            ]
        },
    ];

    const showFile = () => {
        if (filesUploadData.length > 0) {
            const primerArchivo = filesUploadData[0];
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

    const onAmountChange = (e) => {
        let _selectedAmounts = [...selectedAmounts];
        if (e.checked) {
            _selectedAmounts.push(e.value);
        } else {
            _selectedAmounts = _selectedAmounts.filter(r => r.number !== e.value.number) ;
        }
        setSelectedAmounts(_selectedAmounts)
    };

    return{
        tableColumns,
        tableComponentRef,
        tableActions,
        toast,
        items,
        visible,
        setVisible,
        setFilesUploadData,
        handleFileNameChange
    }

}