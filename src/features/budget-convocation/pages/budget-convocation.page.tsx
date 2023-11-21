import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, SelectComponent, MultiSelects } from "../../../common/components/Form";
import useBudgetSearch from "../hooks/search-budget.hook";
import TableComponent from "../../../common/components/table.component";
import Svgs from "../../../public/images/icons/svgs";


const SearchBudgetPage = (): React.JSX.Element => {

    const { announcementList, budgetList, control, errors, clearFields, register, setValue, navigate,
        tableComponentRef, showTable, tableColumns, showDownloadButton, onSubmit, reset, downloadCollection,
        tableActions
    } = useBudgetSearch();

    const [sendingReportXlsx, setSendingReportXlsx] = useState(false);

    return (
        <Fragment>
            <div className="main-page">
                <div className="card-table">
                    <div className="title-area">
                        <label className="text-black extra-large medium">
                            Buscar presupuesto convocatoria
                        </label>
                    </div>

                    <div className="container-sections-forms">
                        <FormComponent
                            id="searchBudget"
                            className="form-signIn"
                            action={onSubmit}
                        >
                            <div>
                                <div className="grid-form-4-container mb-24px">

                                    <MultiSelects
                                        idInput={"id_comuna"}
                                        control={control}
                                        errors={errors}
                                        data={budgetList}
                                        label={<>Fondo Comuna <span>*</span></>}
                                        className={"select-basic medium select-disabled-list input-basic input-regular"}
                                        classNameLabel="text-black big medium label-regular"
                                        placeholder="Seleccionar."
                                        filter={true}

                                    />
                                    <SelectComponent
                                        idInput={"periodo"}
                                        control={control}
                                        errors={errors}
                                        data={announcementList}
                                        label={<>Convocatoria <span>*</span></>}
                                        className={"select-basic medium select-disabled-list input-basic input-regular"}
                                        classNameLabel="text-black big medium label-regular"
                                        filter={true}
                                        placeholder="Seleccione."
                                    />
                                </div>
                            </div>

                            <div className="button-save-container-display m-top-20">
                                <ButtonComponent
                                    form="searchBudget"
                                    value={"Limpiar"}
                                    className="button-clean medium"
                                    type="button"
                                    action={() => {
                                        clearFields();
                                        tableComponentRef.current.emptyData();
                                    }
                                    }
                                />
                                <ButtonComponent
                                    form="searchBudget"
                                    value={`Buscar`}
                                    className="button-save large hover-three disabled-black"
                                />
                            </div>
                        </FormComponent>
                    </div>

                    {showTable && (
                        <>
                            <div>
                                <TableComponent
                                    ref={tableComponentRef}
                                    url={`${process.env.urlApiFunds}/api/v1/presupuesto/getbudget-paginated/`}
                                    columns={tableColumns}
                                    //actions={tableActions}
                                    titleMessageModalNoResult="Buscar"
                                    princialTitle="Informe legalización"
                                    isShowModal={true}
                                    descriptionModalNoResult="No se encontraron resultados que coincidan con tu búsqueda. Por favor, intenta con otros criterios."
                                    onResult={(rows) => {
                                        setSendingReportXlsx(rows.length > 0);
                                    }}
                                />

                                <div>
                                    <br />
                                    <hr className="barra-spacing" />
                                </div>
                                {sendingReportXlsx ? (
                                <div className="button-save-container-display mr-24px">
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
                                </div>
                                ) : ''}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Fragment>
    );

};


export default React.memo(SearchBudgetPage);
