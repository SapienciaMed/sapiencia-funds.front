import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useRenewaReportSearch from "../hooks/renewal-report.hook";
import TableComponent from "../../../common/components/table.component";

const SearchRenewalReportPage = (): React.JSX.Element => {
    const {
        control, errors, clearFields, register, setValue, navigate, tableComponentRef, showTable,
        setShowTable, onSubmit, reset, announcementList, tableColumns, tableActions,
    } = useRenewaReportSearch();
    const [tableView, setTableView] = useState<boolean>(false);

    return (
        <Fragment>
            <div className="card-table">
                <div className="title-area">
                    <label className="text-black extra-large medium">
                        Visualizar informe renovación
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
                        url={`${process.env.urlApiFunds}/api/v1/sapiencia/getbudget-paginated/`}
                        columns={tableColumns}
                        actions={tableActions}
                        isShowModal={false}
                    />
                    
                )}
                

                <div className="container-sections-forms">
                    <div className="title-area">
                        <label className="text-black large medium grid-span-4-columns">Totales</label>
                    </div>
                    <div className="grid-form-3-container mb-24px">
                        <InputComponent
                            register={control.register}
                            idInput="name"
                            className="input-basic medium"
                            typeInput="text"
                            label="Nro habilitados"
                            classNameLabel="text-black big text-required"
                            errors={errors}
                            disabled= {true}
                        />
                        <InputComponent
                            register={control.register}
                            idInput="name"
                            className="input-basic medium"
                            typeInput="text"
                            label="Nro renovados"
                            classNameLabel="text-black big text-required"
                            errors={errors}
                            disabled= {true}
                        />
                        <InputComponent
                            register={control.register}
                            idInput="name"
                            className="input-basic medium"
                            typeInput="text"
                            label="Porcentaje"
                            classNameLabel="text-black big text-required"
                            errors={errors}
                            disabled= {true}
                        />
                    </div>
                </div>

                <div className="container-sections-forms">
                    <div className="title-area">
                        <label className="text-black large medium grid-span-4-columns">
                            Beca mejores bachilleres legalizados</label>
                    </div>

                    <div className="grid-form-3-container mb-24px">
                        <InputComponent
                            register={control.register}
                            idInput="name"
                            className="input-basic medium"
                            typeInput="text"
                            label="Nro habilitados"
                            classNameLabel="text-black big text-required"
                            errors={errors}
                        />
                        <InputComponent
                            register={control.register}
                            idInput="name"
                            className="input-basic medium"
                            typeInput="text"
                            label="Nro renovados"
                            classNameLabel="text-black big text-required"
                            errors={errors}
                            disabled= {true}
                        />
                        <InputComponent
                            register={control.register}
                            idInput="name"
                            className="input-basic medium"
                            typeInput="text"
                            label="Porcentaje"
                            classNameLabel="text-black big text-required"
                            errors={errors}
                            disabled= {true}
                        />
                    </div>
                </div>
                <div>
                <ButtonComponent
                        form="searchBudget"
                        value={`Descargar`}
                        className="button-save large hover-three disabled-black"
                    />
                </div>
                <div className="button-save-container-display m-top-20">
                    <ButtonComponent
                        form="searchBudget"
                        value={"Cancelar"}
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
                        value={`Guardar`}
                        className="button-save large hover-three disabled-black"
                    />
                </div>
            </div>

        </Fragment>
    );

};


export default React.memo(SearchRenewalReportPage);