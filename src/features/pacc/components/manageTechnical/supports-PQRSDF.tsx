import React, { useState } from "react";
import TableComponent from "../../../../common/components/table.component";
import useSupportsPQRSDF from "./hook/supports-PQRSDF.hook";
import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router-dom";
import { typePrefixeTabs } from "../../helpers/TypePrefixeTab";

function SupportsPQRSDF({ document }) {

    const {tableColumns, tableComponentRef, tableActions } = useSupportsPQRSDF({document})
    const [ showSpinner, setShowSpinner ] = useState(true)
    const { typeState } =  useParams()

    return(
        <section className=" card-table mt-20px">
            {
                showSpinner && <ProgressSpinner style={{width: '25px', height: '25px'}}  animationDuration=".5s" />
            }
            <TableComponent
                ref={tableComponentRef}
                url={`${process.env.urlApiFunds}/api/v1/${typePrefixeTabs(parseInt(typeState))}/get-pqrsdf-external`}
                columns={tableColumns}
                actions={tableActions}
                titleMessageModalNoResult="Buscar"
                descriptionModalNoResult="No se encontraron soportes PQRSDF"
                isShowModal={true}
                classSizeTable='size-table-wd-150'
                princialTitle="Soportes PQRSDF"
                isMobil={false}
                setShowSpinner={setShowSpinner}
            />
     </section>
    )

}

export default React.memo(SupportsPQRSDF);