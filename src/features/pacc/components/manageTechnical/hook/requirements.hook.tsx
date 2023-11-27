import { useContext, useEffect, useRef, useState } from "react";
import { ITableAction, ITableElement } from "../../../../../common/interfaces";
import { MenuItem } from "primereact/menuitem";
import { AppContext } from "../../../../../common/contexts/app.context";
import { FaEllipsisH } from "react-icons/fa";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";

export default function useRequeriments() {
      
    const tableComponentRef = useRef(null);
    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [filesUploadData, setFilesUploadData] = useState<File[]>([]);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const { setMessage } = useContext(AppContext);

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
                return(
                    <div className="card-header">
                        <div className="card-options">
                            <button className="btn btn-secondary btn-sm" onClick={(e) => toast.current.toggle(e)} >
                                <FaEllipsisH  />
                            </button>
                            <OverlayPanel ref={toast}>
                                <Menu model={items} />
                            </OverlayPanel>
                        </div>
                    </div>
                )
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