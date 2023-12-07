import React from "react";
import useRequeriments from "./hook/requirements.hook";
import { Dialog } from 'primereact/dialog';
import { ButtonComponent } from "../../../../common/components/Form";
import TableComponent from "../../../../common/components/table.component";
import UploadNewComponent from "../../../../common/components/Form/UploadNewComponent";

function Requirements() {

    const {
        tableColumns, tableComponentRef, visible, showTable, setVisible, setFilesUploadData, onCancel, saveFile
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
                <UploadNewComponent
                    id='cargarArchivo'
                    dataArchivo={(files: File) => {
                        if (files && files.name) { 
                            setFilesUploadData(files)
                            setVisible(false)
                        }
                    }}
                    showModal={(e: boolean) => { setVisible(e) }}
                    titleFilesAccept="Solo es permitido el formato PDF"
                    filesAccept="application/pdf"
                />
                <div className="modal-footer" style={{margin: '1rem'}}>
                    <ButtonComponent
                        value='Cancelar'
                        className='button-ok small'
                        type='button'
                        action={() => { 
                            setVisible(false)
                            setFilesUploadData(null)
                        }}
                    />
                </div>
            </Dialog>

                
                <section className=" card-table mt-20px">
                    {
                        showTable &&
                            <TableComponent
                                ref={tableComponentRef}
                                url={`${process.env.urlApiFunds}/api/v1/consolidation-tray/get-requirements-by-beneficiary-list`}
                                columns={tableColumns}
                                titleMessageModalNoResult="Buscar"
                                isShowModal={true}
                                princialTitle="Requisitos"
                                isMobil={false}
                                count={true}
                                isNotBorderClasse={true}
                                descriptionModalNoResult="No se encontraron Requisitos"
                            />
                    }
                    <div className="funcionality-buttons-container">
                        <ButtonComponent
                            value="Cancelar"
                            type="button"
                            className="button-clean-fields bold"
                            action={onCancel}
                        />
                        <ButtonComponent
                            className="button-main huge hover-three"
                            value="Guardar"
                            type="submit"
                            action={saveFile}
                        />
                    </div>   
                </section>  
            
        </>
    )
    
}

export default React.memo(Requirements);
