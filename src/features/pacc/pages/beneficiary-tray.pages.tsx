import React from "react";
import { EDirection } from "../../../common/constants/input.enum";
import TableComponent from "../../../common/components/table.component";
import useBeneficiaryTray from "../hook/beneficiary-tray.hook";
import { FormComponent,  SelectComponent } from "../../../common/components/Form";
import { ProgressSpinner } from 'primereact/progressspinner';
import { EStatePac } from "../../../common/constants/api.enum";
import { typePrefixeTabs } from "../helpers/TypePrefixeTab";

/* ---- Este componente se reutilizara en varias Tabs --- */

function BeneficiaryTrayPage({ typeState, isCut = true, changeCut = true }: Readonly<{ typeState: EStatePac, isCut?: boolean, changeCut?: boolean }>) {

    const { tableComponentRef, tableColumns, tableActions, idCutData, control, showSpinner, valueFilterTable,
        handleFilterChange, handleChangeCut,  apiUrl, setShowSpinner, resetValue } = useBeneficiaryTray(typeState, isCut, changeCut)

    return(
        <div className="card-table gap-0 mt-14px">
            {
                isCut && 
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
                                placeholder="Seleccionar"
                                direction={EDirection.column}
                                fieldArray={true}
                                optionSelected={(value) => handleChangeCut(value)}
                            />

                        </FormComponent>                 
                    </section>
            }
            <section className={isCut ? 'card-table mt-20px' : ''}>
                {
                    showSpinner && <ProgressSpinner style={{width: '25px', height: '25px'}}  animationDuration=".5s" />
                }
                
                <TableComponent
                    ref={tableComponentRef}
                    url={apiUrl()}
                    columns={tableColumns()}
                    actions={tableActions}
                    titleMessageModalNoResult="Buscar"
                    descriptionModalNoResult="No se encontraron resultados"
                    isShowModal={true}
                    classSizeTable='size-table-wd-150'
                    isInputSearch={true}
                    onGlobalFilterChange={handleFilterChange}
                    valueFilterTable={valueFilterTable}
                    isMobil={false}
                    resetValue={resetValue}
                    isNotBorderClasse={true}
                    setShowSpinner={(value) => setShowSpinner(value)}
                />
            </section>

        </div>
    )
}

export default React.memo(BeneficiaryTrayPage)