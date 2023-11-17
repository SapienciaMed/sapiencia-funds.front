import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ITabsMenuTemplate } from "../../../common/interfaces/tabs-menu.interface";
import TabListComponent from "../../../common/components/tab-list.component";
import BasicTableComponent from "../../../common/components/basic-table.component";
import { InputComponent } from "../../../common/components/Form";
import { IActa, IActaItems, ITableAction, ITableElement } from "../../../common/interfaces";
import { EDirection } from "../../../common/constants/input.enum";
import { Control, UseFormRegister } from "react-hook-form";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";

interface IPropTabSearch{
    tableComponentRef: React.MutableRefObject<any>,
    valueAction?: "edit";
    dataGridItems: IActaItems[];
    tableActionsEdit: ITableAction<IActaItems>[]
    tableColumns: ITableElement<any>[];
    register: UseFormRegister<IActa>;
    control: Control<IActa, any>
}


function TabSearchResultMobil({ control, dataGridItems, register, 
    tableColumns, tableComponentRef, valueAction, tableActionsEdit }:IPropTabSearch ) {

    const { option } = useParams();

    const tabs: ITabsMenuTemplate[] = [
        { 
            id: "actaFinanciero", 
            title: "Acta control financiero", 
            content:(
                <section className="card-user mt-14px">
                    <BasicTableComponent
                        ref={tableComponentRef}
                        data={dataGridItems}
                        columns={tableColumns}
                        actions={valueAction ? tableActionsEdit : undefined}
                        titleMessageModalNoResult="Registro no existente"
                        isShowModal={true}
                        secondaryTitle={"Acta control financiero"}
                        classSizeTable="size-table-wd-150"
                    />
                    
                    <div className='grid-form-3-container'>
                        <InputNumberComponent
                            control={control}
                            idInput={`vigency1`}
                            label="Verificador 1"
                            className="inputNumber-basic medium"
                            placeholder={'0'}
                            classNameLabel="text-black big"
                            mode="currency"
                            currency="COP"
                            locale="es-CO"
                            fieldArray={true}
                            minFractionDigits={0}
                            maxFractionDigits={0}
                            disabled
                        />
                        <InputNumberComponent
                            control={control}
                            idInput={`vigency2`}
                            label="Verificador 2"
                            className="inputNumber-basic medium"
                            placeholder={'0'}
                            classNameLabel="text-black big"
                            mode="currency"
                            currency="COP"
                            locale="es-CO"
                            fieldArray={true}
                            minFractionDigits={0}
                            maxFractionDigits={0}
                            disabled
                        />
                        <InputNumberComponent
                            control={control}
                            idInput={`techo`}
                            label="techo"
                            className="inputNumber-basic medium"
                            placeholder={'0'}
                            classNameLabel="text-black big"
                            mode="currency"
                            currency="COP"
                            locale="es-CO"
                            fieldArray={true}
                            minFractionDigits={0}
                            maxFractionDigits={0}
                            disabled
                        />
                    </div>
                </section>
            ), 
            action: () => {}
        },
        { 
            id: "totales", 
            title: "Totales", 
            content: (
                <section className="card-user mt-14px">
                    
                    <div className="card-user">
                        <div className="title-area">
                            <label className="text-black large" style={{margin: '0px'}}>Totales</label>
                        </div>

                        <div className='grid-form-4-container'>
                            <InputComponent
                                idInput={"tQuantity1"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Cantidad periodo 1"
                                register={register}
                                classNameLabel="text-black big"
                                direction={EDirection.column}
                                disabled
                            />
                            <InputNumberComponent
                                control={control}
                                idInput={`tValue1`}
                                label="Valor periodo 1"
                                className="inputNumber-basic medium "
                                placeholder={'0'}
                                classNameLabel="text-black big"
                                mode="currency"
                                currency="COP"
                                locale="es-CO"
                                fieldArray={true}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                disabled
                            />
                            <InputComponent
                                idInput={"tQuantity2"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Cantidad periodo 2"
                                register={register}
                                classNameLabel="text-black big"
                                direction={EDirection.column}
                                placeholder={""}
                                disabled
                            />
                            <InputNumberComponent
                                control={control}
                                idInput={`tValue2`}
                                label="Valor periodo 2"
                                className="inputNumber-basic medium "
                                placeholder={'0'}
                                classNameLabel="text-black big"
                                mode="currency"
                                currency="COP"
                                locale="es-CO"
                                fieldArray={true}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                disabled
                            />
                        </div>

                        <div className='grid-form-3-container gap-15'>
                            <InputNumberComponent
                                control={control}
                                idInput={`subtotalVigency`}
                                label="Subtotal vigencia"
                                className="inputNumber-basic medium "
                                placeholder={'0'}
                                classNameLabel="text-black big"
                                mode="currency"
                                currency="COP"
                                locale="es-CO"
                                fieldArray={true}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                disabled
                            />
                            <InputNumberComponent
                                control={control}
                                idInput={`totalCostBillsOperation`}
                                label="Costos y gastos de operación"
                                className="inputNumber-basic medium "
                                placeholder={'0'}
                                classNameLabel="text-black big"
                                mode="currency"
                                currency="COP"
                                locale="es-CO"
                                fieldArray={true}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                disabled
                            />
                            <InputNumberComponent
                                control={control}
                                idInput={`totalNet`}
                                label="Neto"
                                className="inputNumber-basic medium "
                                placeholder={'0'}
                                classNameLabel="text-black big"
                                mode="currency"
                                currency="COP"
                                locale="es-CO"
                                fieldArray={true}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                disabled
                            />
                        </div>

                        <div className='grid-form-2-container gap-15'>
                            
                            <InputNumberComponent
                                control={control}
                                idInput={`totalResourcesCredit`}
                                label="Recursos para el crédito"
                                className="inputNumber-basic medium "
                                placeholder={'0'}
                                classNameLabel="text-black big"
                                mode="currency"
                                currency="COP"
                                locale="es-CO"
                                fieldArray={true}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                disabled
                            />

                            <InputNumberComponent
                                control={control}
                                idInput={`totalFinancialOperatorCommission`}
                                label="Total comisión operador financiero"
                                className="inputNumber-basic medium "
                                placeholder={'0'}
                                classNameLabel="text-black big"
                                mode="currency"
                                currency="COP"
                                locale="es-CO"
                                fieldArray={true}
                                minFractionDigits={0}
                                maxFractionDigits={0}
                                disabled
                            />      
                        </div>

                    </div>
                </section>
            ), 
            action: () => {} 
        },
    ];
    const start = tabs.find((tab) => tab.id.toString().toLowerCase() === option?.toLowerCase());

    return (
        <div className="mt-14px">
            <TabListComponent tabs={tabs} start={start}/>
        </div>
    )
}

export default React.memo(TabSearchResultMobil);