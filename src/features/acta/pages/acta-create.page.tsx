import React, { Fragment, useContext } from "react";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import useActaCreate from "../hooks/acta-create.hook";
import useActaItems from "../hooks/items.hook";
import TableGridComponent from "../../../common/components/tableGrid.component";
import { IActaItems } from '../../../common/interfaces/actaItems.interface';
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import BasicTableComponent from "../../../common/components/basic-table.component";

import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import ItemsCreatePage from "./items-create.page";
import { AppContext } from "../../../common/contexts/app.context";
        


const ActaCreatePage = () => { 

    const {  setMessage } = useContext(AppContext);

    const { errors, register, onsubmitItem, showTable, tableComponentRef, datos, setDataGridItems, dataGridItems, salary } = useActaCreate();

   // console.log("asi llegan los datos", datos)

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
            fieldName: "averageCost.quantityPeriod1",
            header: "Cantidad",
        },
        {
            fieldName: "averageCost.valuePeriod1",
            header: "Valor",
        },
        {
            fieldName: "averageCost.quantityPeriod2",
            header: "Cantidad",
        },
        {
            fieldName: "averageCost.valuePeriod2",
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
        },
        {
            fieldName: "",
            header: "Acción",
        }, 

    ];

    const tableActions: ITableAction<IActaItems>[] = [
        {
            icon: "Edit",
            onClick: (row) => { 
                //console.log(row.ident)

                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <ItemsCreatePage acta={row} action={"edit"} />,
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
            onClick: (row) => { },
        }
    ];

    //console.log('datos',dataGridItems)
    

    return (
        <Fragment>
            <div className="title-area">
                <p className="text-black huge ml-24px mt-20px mg-0">Acta</p>
            </div>
            <FormComponent id="createActaForm" className="form" action={onsubmitItem}>
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
                                <InputComponent
                                    idInput={"numberProject"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Número proyecto"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                                <InputComponent
                                    idInput={"periodVigency"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Periodos por vigencia"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
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
                                    //direction={EDirection.column}
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
                                    //direction={EDirection.column}
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

                <div className="button-save-container-display-maestros margin-right0 mr-24px">
                    <ButtonComponent
                        form="createActaForm"
                        value="Agregar item"
                        type="submit"
                        className="button-save large disabled-black"
                    />
                </div>

                <div
                    /* style={
                        dataGridItems.length > 0 ? { display: "block" } : { display: "none" }
                    } */
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
                            />
                            
                               
                            

                            <h1>Totales</h1>

                           
                          
         

                        </div>
                    </div>

                    <div className="container-form padding-form">
                        <div>
                            <div className='grid-form-3-container mb-24px'>
                                <InputComponent
                                    idInput={"costsExpenses"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Verificador 1"
                                    //register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                />
                                <InputComponent
                                    idInput={"OperatorCommission"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Verificador 2"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                />
                                <InputComponent
                                    idInput={"financialOperation"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Techo"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                />
                            </div>

                        </div>
                    </div>


                </div>





            </FormComponent>

            <hr />

            <div className="button-save-container-display-maestros margin-right0 mr-24px">
                <ButtonComponent
                    form="createMasterForm"
                    value="Cancelar"
                    type="button"
                    className="button-cancel-text large hover-three disabled-black"
                //action={() => CancelFunction()}                    
                />
                <ButtonComponent
                    form="createMasterForm"
                    value="Guardar"
                    type="submit"
                    className="button-save large disabled-black"
                />
            </div>



        </Fragment>

    )
}

export default React.memo(ActaCreatePage);