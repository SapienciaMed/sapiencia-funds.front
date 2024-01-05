import React from "react";
import { EDirection } from "../../../common/constants/input.enum";
import TableComponent from "../../../common/components/table.component";
import useBeneficiaryTray from "../hook/beneficiary-tray.hook";
import { ButtonComponent, FormComponent,  SelectComponent } from "../../../common/components/Form";
import { ProgressSpinner } from 'primereact/progressspinner';
import { EStatePac } from "../../../common/constants/api.enum";
import Svgs from "../../../public/images/icons/svgs";

/* ---- Este componente se reutilizara en varias Tabs --- */

function BeneficiaryTrayPage({ typeState, isCut = true, changeCut, isProgram, isDowloadFile }: Readonly<{ typeState: EStatePac, isCut?: boolean, changeCut?: boolean, isProgram?: boolean, isDowloadFile?: boolean }>) {

    const { tableComponentRef, tableColumns, tableActions, idCutData, control, showSpinner, valueFilterTable, idProgramData,
        handleFilterChange, handleChangeCut,  apiUrl, setShowSpinner, resetValue, handleChangeProgram } = useBeneficiaryTray(typeState, isCut, changeCut, isProgram)

    return(
        <div className="card-table gap-0 mt-14px">
            <section className='grid-form-3-container'>  
                {
                    isCut && 
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
                }
                {
                    isProgram && 
                            <FormComponent action={() => {}}>
                                <SelectComponent
                                    idInput={"idProgram"}
                                    control={control}
                                    data={idProgramData}
                                    label="Programa"
                                    className="select-basic big select-disabled-list"
                                    classNameLabel='text-black biggest text-with-colons'
                                    filter={true}
                                    placeholder="Seleccionar"
                                    direction={EDirection.column}
                                    fieldArray={true}
                                    optionSelected={(value) => handleChangeProgram(value)}
                                />

                            </FormComponent>
                }
            </section>
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
                 {
                    isDowloadFile && 
                        <section className="mt-20px">
                            <div className="display-justify-flex-end ">
                                <ButtonComponent
                                    value={
                                    <div className="container-buttonText">
                                        <span>Descargar</span>
                                        <Svgs svg="excel" width={23.593} height={28.505} />
                                    </div>
                                    }
                                    className="button-download large "
                                    // action={} Futura HU
                                />
                                </div>
                        </section>
                }
            </section>
        </div>
    )
}

export default React.memo(BeneficiaryTrayPage)