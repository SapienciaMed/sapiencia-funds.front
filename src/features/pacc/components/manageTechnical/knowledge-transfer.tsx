import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import TableComponent from "../../../../common/components/table.component";
import useKnowledgeTransfer from "./hook/knowledge-transfer.hook";
import { ButtonComponent } from "../../../../common/components/Form";

function KnowledgeTransfer() {

    const {tableColumns, tableComponentRef, onCancel } = useKnowledgeTransfer()

    return (
        <section className=" card-table mt-20px">
            {/* <ProgressSpinner style={{width: '25px', height: '25px'}}  animationDuration=".5s" /> */}

            <TableComponent
                ref={tableComponentRef}
                url={`${process.env.urlApiFunds}/api/v1/consolidation-tray/get-knowledge-transfer-by-beneficiary`}
                columns={tableColumns}
                titleMessageModalNoResult="Buscar"
                descriptionModalNoResult="No se encontraron Transferencia de conocimiento"
                isShowModal={true}
                classSizeTable='size-table-wd-110'
                princialTitle="Horas Transferencia de conocimiento"
                isMobil={false}
                viePaginator={false}
                isNotBorderClasse={true}
            />

            <div className="funcionality-buttons-container border-top">
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
                />
            </div>   
        </section>
    )

}

export default React.memo(KnowledgeTransfer);
