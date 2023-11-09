import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, SelectComponent, MultiSelects } from "../../../common/components/Form";
import useBudgetSearch from "../hooks/search-budget.hook";
import TableComponent from "../../../common/components/table.component";
import Svgs from "../../../public/images/icons/svgs";


const SearchBudgetPage = (): React.JSX.Element => {

    const { announcementList, budgetList, control, errors, clearFields, register, setValue, navigate,
        tableComponentRef, showTable, tableColumns, setShowTable, onSubmit, reset, downloadCollection,
    } = useBudgetSearch();
    const [tableView, setTableView] = useState<boolean>(false);

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
                                <div className="grid-form-3-container mb-24px">

                                    <MultiSelects
                                        idInput={"id_comuna"}
                                        control={control}
                                        errors={errors}
                                        data={budgetList}
                                        label={<>Fondo Comuna <span>*</span></>}
                                        className={"select-basic medium select-disabled-list input-basic input-regular"}
                                        classNameLabel="text-black big medium label-regular"
                                        filter={true}
                                        placeholder="Seleccionar."

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
                                        reset();
                                        tableComponentRef.current.emptyData();
                                        setTableView(false);
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

                        <TableComponent
                            ref={tableComponentRef}
                            url={`${process.env.urlApiFunds}/api/v1/presupuesto/getbudget-paginated/`}
                            columns={tableColumns}
                            isShowModal={false}
                        />
                    )}
                </div>

                <div>
                    <br />
                    <hr className="barra-spacing" />
                </div>
                <div className="button-save-container-display mr-24px">
                    {("CUENTA_COBRO_EXCEL") && (
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
                    )}
                </div>
            </div>
        </Fragment>
    );

};


export default React.memo(SearchBudgetPage);
