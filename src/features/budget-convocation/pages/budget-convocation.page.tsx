import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, SelectComponent } from "../../../common/components/Form";
import useBudgetSearch from "../hooks/search-budget.hook";
import TableComponent from "../../../common/components/table.component";
import { BiPlusCircle } from 'react-icons/bi';
import TableComponentNew from "../../../common/components/tableNew.component";
import { AppContext } from "../../../common/contexts/app.context";

const SearchBudgetPage = (): React.JSX.Element => {

    const { typeMasterList, control, errors, clearFields, register, setValue, navigate,
        tableComponentRef, showTable, tableActions, tableColumns, setShowTable, onSubmit, reset
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
                                <div className="grid-form-4-container mb-24px">
                                    <SelectComponent
                                        idInput={"codtlmo"}
                                        control={control}
                                        errors={errors}
                                        data={[
                                            { value: "1", name: "1234", },
                                            { value: "2", name: "5678", },
                                            { value: "3", name: "7890", },
                                        ]}
                                        label={
                                            <>
                                                Fondo comuna <span>*</span>
                                            </>
                                        }
                                        className={"select-basic medium select-disabled-list input-basic input-regular"}
                                        classNameLabel="text-black big medium label-regular"
                                        filter={true}
                                        placeholder="Seleccione."

                                    />
                                    <SelectComponent
                                        idInput={"codtlmo"}
                                        control={control}
                                        errors={errors}
                                        data={[
                                            { value: "1", name: "2021", },
                                            { value: "2", name: "2022", },
                                            { value: "3", name: "2023", },
                                        ]}
                                        label={
                                            <>
                                                Convocatoria <span>*</span>
                                            </>
                                        }
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
                                        //tableComponentRef.current.emptyData();
                                        //setTableView(false);
                                    }
                                    }
                                />
                                <ButtonComponent
                                    form="searchBudget"
                                    value={`Guardar`}
                                    className="button-save large hover-three disabled-black"
                                />
                            </div>
                        </FormComponent>
                    </div>
                    {tableView && (
                        <div className="container-sections-forms">
                            <TableComponent
                                ref={tableComponentRef}
                                url={`${process.env.urlApiPayroll}/api/v1/vinculation/get-paginated`}
                                columns={tableColumns}
                                actions={tableActions}
                                isShowModal={false}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );

};

export default React.memo(SearchBudgetPage);
