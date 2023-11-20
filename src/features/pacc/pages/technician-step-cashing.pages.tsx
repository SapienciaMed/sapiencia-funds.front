import React from "react";
import { SelectComponentUser } from "../../../common/components/Form/select.component.user";
import { EDirection } from "../../../common/constants/input.enum";
import TableComponent from "../../../common/components/table.component";
import useTechnicianStepCashing from "../hook/techician-step.hook";

function TechnicianStepCashing() {

    const { tableComponentRef, tableColumns } = useTechnicianStepCashing()
    
    return(
        <div className="card-table gap-0 mt-14px">
             <section className='grid-form-3-container'>
                <SelectComponentUser
                    idInput={"numberProject"}
                    data={[]}
                    label="Corte"
                    className="select-basic medium select-disabled-list"
                    classNameLabel={`text-black big text-with-colons`}
                    placeholder="Seleccionar."
                    direction={EDirection.column}
                />


             </section>
             <section className="mt-20px">
                <TableComponent
                    ref={tableComponentRef}
                    url={`${process.env.urlApiFunds}/api/v1/`}
                    columns={tableColumns}
                    titleMessageModalNoResult="Buscar"
                    princialTitle="Informe legalización"
                    isShowModal={true}
                    classSizeTable='size-table-wd-150'
                />

             </section>

        </div>
    )
}

export default React.memo(TechnicianStepCashing)