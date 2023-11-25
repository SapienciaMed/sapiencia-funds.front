import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useRenewaReportSearch from "../hooks/renewal-report.hook";
import TableComponent from "../../../common/components/table.component";
import Svgs from "../../../public/images/icons/svgs";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { ICallRenewal } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import BasicTableComponent from "../../../common/components/basic-table.component";
import { UseFormGetValues } from 'react-hook-form';
import ItemsEditePage from "./items-edit.page";

const SearchRenewalReportPage = (): React.JSX.Element => {
    const { setMessage } = useContext(AppContext);

    const {
        control, errors, clearFields, register, setValue, navigate, tableComponentRef, showTable,
        setShowTable, onSubmit, reset, announcementList, dataGridRenewal, searchRenewal, downloadCollection,
        totalEnabled, totalrenewed, averagePercentage, enabledBachLeg,renewedBachLeg
    } = useRenewaReportSearch();


    const tableColumnsRenewal: ITableElement<ICallRenewal>[] = [
        {
            fieldName: "fund",
            header: "Fondo",
        },
        {
            fieldName: "enabled",
            header: "Nro habilitados"
        },
        {
            fieldName: "renewed",
            header: "Nro renovados",
        },
        {
            fieldName: "percentage",
            header: "Porcentaje",
        },

    ];

    const tableActionsRenewal: ITableAction<ICallRenewal>[] = [
        {
            icon: "Edit",
            onClick: (row) => {
                const dataEditTable: ICallRenewal = {
                    fund: row.fund,
                    enabled: row.enabled,
                    renewed: row.renewed,
                    percentage: "90"
                }
                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <ItemsEditePage renewal={dataEditTable} renewalitem={row} />,
                    background: true,
                    size: "items",
                    items: true,
                    onOk() {
                        setMessage({});
                    },
                });
            },
        },

    ];


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
                                    idInput={"period"}
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
                                }
                                }
                            />
                            <ButtonComponent
                                form="searchBudget"
                                value={`Buscar`}
                                action={() => {
                                    searchRenewal();
                                }}
                                className="button-save large hover-three disabled-black"
                            />
                        </div>
                    </FormComponent>
                </div>

                <div
                    style={
                        dataGridRenewal.length > 0 ? { display: "block" } : { display: "none" }
                    }
                >
                    <div className="container-sections-forms">

                        <BasicTableComponent
                            ref={tableComponentRef}
                            data={dataGridRenewal}
                            columns={tableColumnsRenewal}
                            actions={tableActionsRenewal}
                            titleMessageModalNoResult="Registro no existente"
                            isShowModal={true}
                            secondaryTitle={"Resultados de búsqueda"}
                        />

                    </div>


                    <div className="container-sections-forms">
                        <div className="title-area">
                            <label className="text-black large medium grid-span-4-columns">Totales</label>
                        </div>
                        <div className="grid-form-3-container mb-24px">
                            <InputComponent
                                register={control.register}
                                idInput="enabled"
                                className="input-basic medium"
                                typeInput="text"
                                label="Nro habilitados"
                                classNameLabel="text-black big text-required"
                                errors={errors}
                                disabled={true}
                                value={totalEnabled}
                            />
                            <InputComponent
                                register={control.register}
                                idInput="renewed"
                                className="input-basic medium"
                                typeInput="text"
                                label="Nro renovados"
                                classNameLabel="text-black big text-required"
                                errors={errors}
                                disabled={true}
                                value={totalrenewed}
                            />
                            <InputComponent
                                register={control.register}
                                idInput="89%"
                                className="input-basic medium"
                                typeInput="text"
                                label="Porcentaje"
                                classNameLabel="text-black big text-required"
                                errors={errors}
                                disabled={true}
                                value={averagePercentage}
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
                                placeholder={enabledBachLeg ? enabledBachLeg : ""}

                            />
                            <InputComponent
                                register={control.register}
                                idInput="385"
                                className="input-basic medium"
                                typeInput="text"
                                label="Nro renovados"
                                classNameLabel="text-black big text-required"
                                errors={errors}
                                disabled={true}
                                value={renewedBachLeg}
                            />
                            <InputComponent
                                register={control.register}
                                idInput="89%"
                                className="input-basic medium"
                                typeInput="text"
                                label="Porcentaje"
                                classNameLabel="text-black big text-required"
                                errors={errors}
                                disabled={true}
                                value="89%"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="button-save-container-display mr-24px">
                        </div>

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
                    <div className="button-save-container-display m-top-20">
                        <ButtonComponent
                            form="searchBudget"
                            value={"Cancelar"}
                            className="button-clean medium"
                            type="button"
                            action={() => {
                                reset();
                                tableComponentRef.current.emptyData();
                            }
                            }
                        />
                        <ButtonComponent
                            value={`Guardar`}
                            className="button-save large hover-three disabled-black"
                            action={() => {
                                reset();
                                tableComponentRef.current.emptyData();
                            }
                            }
                        />
                    </div>
                </div>
            </div>

        </Fragment>
    );

};


export default React.memo(SearchRenewalReportPage);