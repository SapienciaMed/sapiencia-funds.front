import React, { Fragment, useContext } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useActaCreate from "../hooks/acta-create.hook";
import { IActaItems } from '../../../common/interfaces/actaItems.interface';
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import BasicTableComponent from "../../../common/components/basic-table.component";

import ItemsCreatePage from "./items-create.page";
import { AppContext } from "../../../common/contexts/app.context";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { Checkbox } from "primereact/checkbox";

const ActaCreatePage = () => {

    const { setMessage } = useContext(AppContext);

    const { errors, register,
        onsubmitCreate,
        tableComponentRef,
        dataGridItems,
        datosActa,
        control,
        projectList,
        projectMeta,
        vigency1,
        addItem,
        totalQuantityPeriod1,
        totalValuePeriod1,
        totalQuantityPeriod2,
        totalValuePeriod2,
        totalCostBillsOperation,
        totalNet,
        totalFinancialOperatorCommission,
        totalResourcesCredit,
        subtotalVigency,
        activeUserList,
        times,
        dataGridUsers,
        addUser,
        checked,
        setChecked,
        send,
        CancelFunction
    } = useActaCreate();



    const tableColumns: ITableElement<IActaItems>[] = [
        {
            fieldName: "program",
            header: "Programa",
        },
        {
            fieldName: "found",
            header: "Fondo"
        },
        {
            fieldName: "line",
            header: "Linea",
        },
        {
            fieldName: "announcement",
            header: "Convocatoria",
        },
        {
            fieldName: "concept",
            header: "Concepto",
        },
        {
            fieldName: "costOperation",
            header: "Costo promedio",
        },
        {
            fieldName: "periods.quantityPeriod1",
            header: "Cantidad",
        },
        {
            fieldName: "periods.valuePeriod1",
            header: "Valor",
        },
        {
            fieldName: "periods.quantityPeriod2",
            header: "Cantidad",
        },
        {
            fieldName: "periods.valuePeriod2",
            header: "Valor",
        },
        {
            fieldName: "subtotalVigency",
            header: "Subtotal vigencia",
        },
        {
            fieldName: "costBillsOperation",
            header: "Costos y gastos de operación",
        },
        {
            fieldName: "net",
            header: "Neto",
        },
        {
            fieldName: "resourcesCredit",
            header: "Recurso para el crédito",
        },
        {
            fieldName: "financialOperatorCommission",
            header: "Comisión operador financiero",
        }

    ];

    const tableActions: ITableAction<IActaItems>[] = [
        {
            icon: "Edit",
            onClick: (row) => {
                //console.log(row.ident)

                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <ItemsCreatePage acta={datosActa} actaItems={row} action={"edit"} />,
                    background: true,
                    size: "items",
                    items: true,
                    onOk() {
                        setMessage({});
                    },
                });
            },
        },
        {
            icon: "Delete",
            onClick: (row) => {
                setMessage({
                    show: true,
                    title: "Eliminar registro",
                    description: "Estás segur@ de eliminar este registro?",
                    OkTitle: "Aceptar",
                    cancelTitle: "Cancelar",
                    onOk() {
                        if (dataGridItems.find((obj) => obj.ident == row.ident)) {
                            const position = dataGridItems.findIndex(
                                (obj) => obj.ident === row.ident
                            );
                            dataGridItems.splice(position, 1);
                            setMessage({})
                        }
                    },
                    background: true,
                });
            },
        }
    ];

    const tableActionsUser: ITableAction<IActaItems>[] = [
        {
            icon: "Delete",
            onClick: (row) => {
                setMessage({
                    show: true,
                    title: "Eliminar registro",
                    description: "Estás segur@ de eliminar este registro?",
                    OkTitle: "Aceptar",
                    cancelTitle: "Cancelar",
                    onOk() {
                        if (dataGridUsers.find((obj) => obj.ident == row.ident)) {
                            const position = dataGridUsers.findIndex(
                                (obj) => obj.ident === row.ident
                            );
                            dataGridUsers.splice(position, 1);
                            setMessage({})
                        }
                    },
                    background: true,
                });
            },
        }
    ];

    const tableColumnsUsers: ITableElement<IActaItems>[] = [
        {
            fieldName: "program",
            header: "Aprobar",
            renderCell: (row) => {
                let checked = false;
                return (
                    /*  <SwitchComponent /> */
                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                );
            }
        },
        {
            fieldName: "user",
            header: "Usuario"
        },
        {
            fieldName: "line",
            header: "Fecha de aprobación",
        }
    ];

    return (
        <Fragment>
            <div className="title-area">
                <p className="text-black huge ml-24px mt-20px mg-0">Acta</p>
            </div>
            <FormComponent id="createActaForm" className="form" action={onsubmitCreate}>
                <div className="container-form-grid-actas">
                    <div className="container-form padding-form">
                        <div>
                            <div className="title-area">
                                <label className="text-black extra-large grid-span-4-columns mb-18px">Crear acta</label>
                            </div>
                            <div className='grid-form-3-container'>
                                <InputComponent
                                    idInput={"idStatus"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Estado"
                                    register={register}
                                    classNameLabel="text-black biggest"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}

                                    value="Pendiente aprobación"
                                />
                                {/*  */}
                                <SelectComponent
                                    idInput={"numberProject"}
                                    control={control}
                                    errors={errors}
                                    data={projectList}
                                    label={
                                        <>
                                            Número proyecto <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."
                                />
                                <InputComponent
                                    idInput={"periodVigency"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Periodos por vigencia"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    errors={errors}
                                    placeholder={""}
                                />
                            </div>
                            <div className='grid-form-3-container mt-20px'>
                                <InputComponent
                                    idInput={"announcementInitial"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Convocatoria inicial"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    errors={errors}
                                    placeholder={""}
                                />
                                <InputComponent
                                    idInput={"salaryMin"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Salario mínimo"
                                    register={register}
                                    classNameLabel="text-black biggest"                                   
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                />
                                
                            </div>

                        </div>
                    </div>
                    <div className="container-form padding-form">
                        <div>
                            <div className="title-area">
                                <label className="text-black extra-large grid-span-4-columns mb-18px">Tasas</label>
                            </div>
                            <div className='grid-form-3-container mb-24px'>
                                <InputComponent
                                    idInput={"costsExpenses"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Costo y gastos de operación logística"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                                <InputComponent
                                    idInput={"OperatorCommission"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Comisión operador financiero"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                                <InputComponent
                                    idInput={"financialOperation"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Operación finaciera MB"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </FormComponent>

            <div className="button-save-container-display-actas margin-right0 mr-24px">
                <ButtonComponent
                    value="Agregar item"
                    action={() => {
                        addItem();
                    }}
                    className="button-save large disabled-black"
                />
            </div>

            <div
           /* style={
                   dataGridItems.length > 0 ? { display: "block" } : { display: "none" }
               }   */
            >
                <div className="container-form-grid mt-24px">
                    <div className="container-form padding-form">
                        <BasicTableComponent
                            ref={tableComponentRef}
                            data={dataGridItems}
                            columns={tableColumns}
                            actions={tableActions}
                            titleMessageModalNoResult="Registro no existente"
                            isShowModal={true}
                            secondaryTitle={"Acta control financiero"}
                        />
                    </div>
                </div>
                <div className="container-form padding-form">
                    <div>
                        <div className="title-area">
                            <label className="text-black extra-large grid-span-4-columns mb-18px">Totales</label>
                        </div>
                        <div className='grid-form-4-container mb-24px'>
                            <InputComponent
                                idInput={"tQuantity1"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Cantidad periodo 1"
                                //register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalQuantityPeriod1)}
                            />
                            <InputComponent
                                idInput={"tValue1"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Valor periodo 1"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalValuePeriod1)}
                            />
                            <InputComponent
                                idInput={"tQuantity2"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Cantidad periodo 2"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalQuantityPeriod2)}
                            />
                            <InputComponent
                                idInput={"tValue2"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Valor periodo 2"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalValuePeriod2)}
                            />
                        </div>
                        <div className='grid-form-3-container mb-24px'>
                            <InputComponent
                                idInput={"tQuantity1"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Subtotal vigencia"
                                //register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(subtotalVigency)}
                            />
                            <InputComponent
                                idInput={"totalCostBillsOperation"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Costo y gasto de operación"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalCostBillsOperation)}
                            />
                            <InputComponent
                                idInput={"totalNet"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Neto"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalNet)}
                            />

                        </div>
                        <div className='grid-form-2-container mb-24px'>
                            <InputComponent
                                idInput={"totalResourcesCredit"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Recursos para el crédito"
                                //register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalResourcesCredit)}
                            />
                            <InputComponent
                                idInput={"totalFinancialOperatorCommission"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Total comisión operador financiero"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(totalFinancialOperatorCommission)}
                            />

                        </div>

                    </div>
                </div>

                <div className="container-form padding-form">
                    <div>
                        <div className='grid-form-3-container mb-24px'>
                            <InputComponent
                                idInput={"vigency1"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Verificador 1"
                                //register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(vigency1)}
                            />
                            <InputComponent
                                idInput={"vigency2"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Verificador 2"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(subtotalVigency)}
                            />
                           <InputComponent
                                idInput={"techo"}
                                className="input-basic medium"
                                typeInput="text"
                                label="techo"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                                disabled
                                value={String(projectMeta)}
                            />                           
                        </div>

                    </div>
                </div>


                <div className="container-form padding-form" >
                    <div>

                        <div>
                            <div className="title-area">
                                <label className="text-black extra-large grid-span-4-columns mb-18px">Citar</label>
                            </div>
                            <div className='grid-form-3-container mb-24px'>
                                <DatePickerComponent
                                    idInput="dateCitation"
                                    control={control}
                                    label={"Fecha"}
                                    errors={errors}
                                    classNameLabel="text-black biggest medium"
                                    className="dataPicker-basic  medium "
                                    placeholder="DD/MM/YYYY"
                                    dateFormat="dd/mm/yy"

                                />

                                <SelectComponent
                                    idInput={"timeCitation"}
                                    control={control}
                                    errors={errors}
                                    data={times}
                                    label={
                                        <>
                                            Hora <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."

                                />
                                <SelectComponent
                                    idInput={"user"}
                                    control={control}
                                    errors={errors}
                                    data={activeUserList}
                                    label={
                                        <>
                                            Usuario-Nombre completo <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."

                                />

                            </div>
                            <div className="button-save-container-display-actas-users margin-right0">
                                <ButtonComponent
                                    value="Agregar"
                                    action={() => {
                                        addUser();
                                    }}
                                    className="button-save large disabled-black"
                                />
                            </div>

                        </div>



                    </div>
                </div>

                <div className="container-form-grid mt-24px">
                    <div className="container-form padding-form">
                        <BasicTableComponent
                            ref={tableComponentRef}
                            data={dataGridUsers}
                            columns={tableColumnsUsers}
                            actions={tableActionsUser}
                            titleMessageModalNoResult="Registro no existente"
                            isShowModal={true}
                            secondaryTitle={""}
                        />
                    </div>
                </div>




            </div>






            <hr />
            <br />
            <div className="button-save-container-display-actas margin-right0 mr-24px">
                <ButtonComponent
                    form="createActaForm"
                    value="Cancelar"
                    type="button"
                    className="button-cancel-text large hover-three disabled-black"
                    action={() => CancelFunction()}
                />
                <ButtonComponent
                    form="createActaForm"
                    value="Guardar"
                    type="submit"
                    className="button-save large disabled-black"
                    disabled={send}
                />
            </div>
            <br />



        </Fragment>

    )
}

export default React.memo(ActaCreatePage);