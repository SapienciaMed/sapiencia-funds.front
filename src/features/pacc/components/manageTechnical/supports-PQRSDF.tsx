import React, { useRef } from "react";
import TableComponent from "../../../../common/components/table.component";
import { ITableElement } from "../../../../common/interfaces";
import useSupportsPQRSDF from "./hook/supports-PQRSDF.hook";

function SupportsPQRSDF({ document }) {

    const {tableColumns, tableComponentRef, tableActions } = useSupportsPQRSDF()

    return(
        <section className=" card-table mt-20px">
            <TableComponent
                ref={tableComponentRef}
                url={`${process.env.urlApiFunds}/api/v1/consolidation-tray/get-pqrsdf-external`}
                columns={tableColumns}
                actions={tableActions}
                titleMessageModalNoResult="Buscar"
                descriptionModalNoResult="No se encontraron soportes PQRSDF"
                isShowModal={true}
                classSizeTable='size-table-wd-150'
                princialTitle="Soportes PQRSDF"
                bodyRequestParameters={document}
                keyBodyRequest={'identification'}
                isMobil={false}
            />
     </section>
    )

}

export default React.memo(SupportsPQRSDF);