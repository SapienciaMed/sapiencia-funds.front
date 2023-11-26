import React from "react";
import useRequeriments from "./hook/requirements.hook";
import { FaEllipsisH } from "react-icons/fa"; 
import { Menu } from 'primereact/menu';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { ButtonComponent, UploadComponent } from "../../../../common/components/Form";


function Requirements() {

    const {
        tableActions, tableColumns, tableComponentRef, toast, items, visible,
        setVisible, setFilesUploadData, handleFileNameChange 
    } = useRequeriments()

    return (
        <>
            {/* Este boton no va aca, va en el tableActions  */}
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
