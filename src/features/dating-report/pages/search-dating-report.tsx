import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, SelectComponent, MultiSelects } from "../../../common/components/Form";
import useDatingSearch from "../hooks/dating-report";
import TableComponent from "../../../common/components/table.component";
import Svgs from "../../../public/images/icons/svgs";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";


const DatingReportRoutes = (): React.JSX.Element => {

    const { programList, control, errors, clearFields, register, setValue, navigate,
        tableComponentRef, showTable, tableColumns, setShowTable, onSubmit, reset, downloadCollection,
    } = useDatingSearch();
    
    const [sendingReportXlsx, setSendingReportXlsx] = useState(false);

    return (
        <Fragment>
            <div className="main-page">
                <div className="card-table">
                    <div className="title-area">
                        <label className="text-black extra-large medium">
                            Visualizar Informe citas
                        </label>
                    </div>

                    <div className="container-sections-forms">
                        <FormComponent
                            id="searchDating"
                            className="form-signIn"
                            action={onSubmit}
                        >
                            <div>
                                <div className="grid-form-3-container mb-24px">
                                <InputNumberComponent
                                    control={control}
                                    idInput={`Convocatoria `}
                                    label="Recursos para crédito"
                                    className="inputNumber-basic medium"
                                    placeholder={'2023-2'}
                                    classNameLabel="text-black biggest  text-required"
                                    errors={errors}
                                    mode="currency"
                                    currency="COP"
                                    locale="es-CO"
                                    fieldArray={true}
                                    minFractionDigits={0}
                                    maxFractionDigits={0}
                                    disabled
                                />
                                <MultiSelects
                                        idInput={"programa"}
                                        control={control}
                                        errors={errors}
                                        data={programList}
                                        label={<>Línea Programa</>}
                                        className={"select-basic medium select-disabled-list input-basic input-regular"}
                                        classNameLabel="text-black biggest  text-required"
                                        filter={true}
                                        placeholder="Seleccionar"

                                />
                                </div>
                            </div>
                            <div className="button-save-container-display m-top-20">
                                <ButtonComponent
                                    form="searchDating"
                                    value={"Limpiar"}
                                    className="button-clean medium"
                                    type="button"
                                    action={() => {
                                        reset();
                                        tableComponentRef.current.emptyData();
                                    }
                                    }
                                />
                                <ButtonComponent
                                    form="searchDating"
                                    value={`Buscar`}
                                    className="button-save large hover-three disabled-black"
                                />
                            </div>
                        </FormComponent>
                    </div>
                    {showTable && (

                        <TableComponent
                            ref={tableComponentRef}
                            url={`${process.env.urlApiFunds}/api/v1/citas/getdating-paginated/`}
                            columns={tableColumns}
                            isShowModal={true}
                            titleMessageModalNoResult="Buscar"
                            descriptionModalNoResult="No se encontraron resultados que coincidan con tu búsqueda. Por favor, intenta con otros criterios."
                            isMobil={true}
                            onResult={(rows) => {
                                setSendingReportXlsx(rows.length > 0);
                              }}

                        />

                    )}
                </div>

                <div>
                    <br />
                    <hr className="barra-spacing" />
                </div>
                <div className="button-save-container-display mr-24px">
                    {sendingReportXlsx ? (
                        <ButtonComponent
                            value={
                                <>
                                    <div className="container-buttonText">
                                        <span>Descargar</span>
                                        <Svgs svg="excel" width={23.593} height={28.505} />
                                    </div>
                                </>
                            }
                            className="button-download large "
                            action={downloadCollection}
                        />
                    ) : ''}
                </div>
            </div>
        </Fragment>
    );

};


export default React.memo(DatingReportRoutes);
