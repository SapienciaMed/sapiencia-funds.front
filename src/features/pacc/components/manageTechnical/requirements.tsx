import React, { useRef, useState } from "react";
import TableComponent from "../../../../common/components/table.component";
import useRequeriments from "./hook/requirements.hook";

import { FaEllipsisH } from "react-icons/fa"; // ELIMINAR
import { Toast } from "primereact/toast";
import { Menu } from 'primereact/menu';
import { ConfirmPopup, confirmPopup, } from 'primereact/confirmpopup';
import { OverlayPanel } from 'primereact/overlaypanel';
import { GrAttachment } from "react-icons/gr";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from 'primereact/dialog';
import { Controller, useForm } from "react-hook-form";
import { ButtonComponent, FormComponent, UploadComponent } from "../../../../common/components/Form";
import { Button } from "primereact/button";

function Requirements() {

    const {tableActions, tableColumns, tableComponentRef} = useRequeriments()

    //TODO: ESTO VA EN EL ESTADO

    const toast = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [filesUploadData, setFilesUploadData] = useState<File[]>([]);
    const [uploadedFileName, setUploadedFileName] = useState("");

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
                        setVisible(true)
                    },                 
                },
                {
                    label: 'Ver adjunto',
                    icon: 'pi pi-eye',
                    command: () => {

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

    const showMenu = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            children:(
                <Menu model={items} popup id="popup_menu" />
            ),

        });
    }

    return (
        <>
            <div className="card-header">
                {/* <Toast ref={toast} />
                <ConfirmPopup /> */}
                <div className="card-options">
                    <button className="btn btn-secondary btn-sm" onClick={(e) => toast.current.toggle(e)} >
                        <FaEllipsisH  />
                    </button>
                    <OverlayPanel ref={toast}>
                        <Menu model={items} />
                    </OverlayPanel>
                </div>
            </div>
 
            <Dialog
                header="Si tienes más de un documento, se deben unir en un solo archivo para ser cargados"
                className="text-center div-modal movil"
                visible={visible}
                onHide={() => setVisible(false)}
                pt={{
                  root: { style: { width: "35em" } },
                }}
            >
                <UploadComponent
                    id="fileList"
                    setFilesData={setFilesUploadData}
                    filesAccept="application/pdf"
                    maxSize={1048576}
                    dropboxMessage="Arrastra y suelta el archivo aquí"
                    multiple={false}
                    onFileChange={handleFileNameChange}
                    
                />
                <div className="container-actions_formTabs">
                    <ButtonComponent
                        value='Cancelar'
                        className='button-save  invalid big'
                        type='button'
                        action={() => { setVisible(false)}}
                    />
                </div>
            </Dialog>


            {/* <section className=" card-table mt-20px">
                <TableComponent
                    ref={tableComponentRef}
                    url={`${process.env.urlApiFunds}/api/v1/consolidation-tray/requirements`}
                    columns={tableColumns}
                    actions={tableActions}
                    titleMessageModalNoResult="Buscar"
                    isShowModal={true}
                    classSizeTable='size-table-wd-150'
                    princialTitle="Soportes PQRSDF"
                />
            </section>      */}
        
        
        </>
    )
    
}

export default React.memo(Requirements);
