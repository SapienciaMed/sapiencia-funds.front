import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, SelectComponent, MultiSelects, InputComponent } from "../../../common/components/Form";
import useFinancialSearch from "../hooks/search-financial.hook";
import TableComponent from "../../../common/components/table.component";
import { EDirection } from "../../../common/constants/input.enum";
import { BiPlusCircle } from 'react-icons/bi';
import { AppContext } from "../../../common/contexts/app.context";

const SearchFinancialPage = (): React.JSX.Element => {

    const { announcementList, budgetList, control, errors, clearFields, register, setValue, navigate,
        tableComponentRef, showTable, tableColumns, setShowTable, onSubmit, reset
    } = useFinancialSearch();
    const [tableView, setTableView] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="main-page">
                <div className="card-table">
                    <div className="title-area">
                        <label className="text-black extra-large medium">
                            Seguimiento financiero
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

                                <InputComponent
                                        register={control.register}
                                        idInput="name"
                                        className="input-basic medium"
                                        typeInput="text"
                                        label="Contrato"
                                        classNameLabel="text-black big text-required"
                                        errors={errors}
                                    />
                                    <InputComponent
                                        register={control.register}
                                        idInput="name"
                                        className="input-basic medium"
                                        typeInput="text"
                                        label="Convocatoria"
                                        classNameLabel="text-black big text-required"
                                        errors={errors}
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
                            url={`${process.env.urlApiFunds}/api/v1/sapiencia/getbudget-paginated/`}
                            columns={tableColumns}
                            //actions={tableActions}
                            isShowModal={false}
                        />
                      
                    )}
                </div>
            </div>
        </Fragment>
    );

};

export default React.memo(SearchFinancialPage);
