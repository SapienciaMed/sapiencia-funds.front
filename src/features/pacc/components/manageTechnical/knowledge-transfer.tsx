import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import TableComponent from "../../../../common/components/table.component";
import useKnowledgeTransfer from "./hook/knowledge-transfer.hook";
import { ButtonComponent } from "../../../../common/components/Form";

function KnowledgeTransfer() {

    const {tableColumns, tableComponentRef } = useKnowledgeTransfer()

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
        </section>
    )

}

export default React.memo(KnowledgeTransfer);
