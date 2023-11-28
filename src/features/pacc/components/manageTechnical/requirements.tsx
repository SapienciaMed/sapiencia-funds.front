import React from "react";
import useRequeriments from "./hook/requirements.hook";
import { Dialog } from 'primereact/dialog';
import { ButtonComponent, UploadComponent } from "../../../../common/components/Form";
import TableComponent from "../../../../common/components/table.component";


function Requirements() {

    const {
        tableActions, tableColumns, tableComponentRef, toast, items, visible,
        setVisible, setFilesUploadData, handleFileNameChange 
    } = useRequeriments()

    return (
        <>
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
                        action={() => { 
                            setVisible(false)
                            setFilesUploadData([])
                        }}
                    />
                </div>
            </Dialog>
            <section className=" card-table mt-20px">
                <TableComponent
                    ref={tableComponentRef}
                    url={`${process.env.urlApiFunds}/api/v1/consolidation-tray/requirements`}
                    columns={tableColumns}
                    titleMessageModalNoResult="Buscar"
                    isShowModal={true}
                    princialTitle="Soportes PQRSDF"
                />
            </section>     
        </>
    )
    
}

export default React.memo(Requirements);
