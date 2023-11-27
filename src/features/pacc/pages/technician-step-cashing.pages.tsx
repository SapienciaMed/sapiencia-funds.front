import React from "react";
import { EDirection } from "../../../common/constants/input.enum";
import TableComponent from "../../../common/components/table.component";
import useTechnicianStepCashing from "../hook/techician-step.hook";
import { FormComponent,  SelectComponent } from "../../../common/components/Form";
import { ProgressSpinner } from 'primereact/progressspinner';
function TechnicianStepCashing() {

    const { tableComponentRef, tableColumns, tableActions, idCutData, control, listSearch, showSpinner, handleFilterChange, handleChangeCut } = useTechnicianStepCashing()

    return(
        <div className="card-table gap-0 mt-14px">
            {
                showSpinner && <ProgressSpinner style={{width: '25px', height: '25px'}}  animationDuration=".5s" />
            }
            
            <section className='grid-form-3-container'>  
                <FormComponent action={() => {}}>
                    <SelectComponent
                        idInput={"idCut"}
                        control={control}
                        data={idCutData}
                        label="Corte"
                        className="select-basic big select-disabled-list"
                        classNameLabel='text-black biggest text-with-colons'
                        filter={true}
                        placeholder="Seleccionar."
                        direction={EDirection.column}
                        fieldArray={true}
                        optionSelected={(value) => handleChangeCut(value)}
                    />

                </FormComponent>                 
            </section>
            <section className=" card-table mt-20px">
                <TableComponent
                    ref={tableComponentRef}
                    url={`${process.env.urlApiFunds}/api/v1/consolidation-tray/${ listSearch.status ? 'get-consolidation-tray-technician-collection-by-cut' :'get-consolidation-tray-technician-collection'}`}
                    columns={tableColumns}
                    actions={tableActions}
                    titleMessageModalNoResult="Buscar"
                    descriptionModalNoResult="No se encontraron resultados"
                    isShowModal={true}
                    classSizeTable='size-table-wd-150'
                    isInputSearch={true}
                    onGlobalFilterChange={handleFilterChange}
                    isMobil={false}
                />
            </section>

        </div>
    )
}

export default React.memo(TechnicianStepCashing)