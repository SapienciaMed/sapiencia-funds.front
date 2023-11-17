import React, { Fragment, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useActaItems from "../hooks/items.hook";
import { IActa } from '../../../common/interfaces/acta.interface';
import { IActaItems } from '../../../common/interfaces/actaItems.interface';
import { Controller } from "react-hook-form";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import { IUserDataGrid } from "../../../common/interfaces";


const ItemsCreatePage = ({ action, acta, actaItems, dataTableServices }: { action, acta?: IActa, actaItems?: IActaItems, dataTableServices?: any[] }) => {

    const [modifiedIdcCountercredit, setModifiedIdcCountercredit] = useState(0)
    const { errors, register, onsubmitAddItem, control, foundList, lineList, conceptList, 
        announcementList,periods, programList, CancelFunction } = useActaItems(action, acta, actaItems, modifiedIdcCountercredit, dataTableServices);

    return (
        <Fragment>
            <FormComponent id="createItemsForm" action={onsubmitAddItem}>
                <section className="card-user">
                    <div className='funcionality-filters-container gap-15'>
                        <SelectComponent
                            idInput={"program"}
                            control={control}
                            errors={errors}
                            data={programList}
                            label='Programa'
                            className="select-basic medium select-disabled-list"
                            classNameLabel="text-black biggest text-required"
                            filter={true}
                            placeholder="Seleccionar."
                            
                        />
                        <SelectComponent
                            idInput={"found"}
                            control={control}
                            errors={errors}
                            data={foundList}
                            label='Fondo'
                            className="select-basic medium select-disabled-list"
                            classNameLabel="text-black biggest text-required"
                            filter={true}
                            placeholder="Seleccionar."
                            fieldArray
                        />
                        <SelectComponent
                            idInput={"line"}
                            control={control}
                            errors={errors}
                            data={lineList}
                            label='Línea'
                            className="select-basic medium select-disabled-list"
                            classNameLabel="text-black biggest text-required"
                            filter={true}
                            placeholder="Seleccionar."
                        />
                    </div>
                    <div className='funcionality-filters-container gap-15'>
                        <SelectComponent
                            idInput={"announcement"}
                            control={control}
                            errors={errors}
                            data={announcementList}
                            label='Convocatoria'
                            className="select-basic medium select-disabled-list"
                            classNameLabel="text-black biggest text-required"
                            filter={true}
                            placeholder="Seleccionar."
                        />
                        <SelectComponent
                            idInput={"concept"}
                            control={control}
                            errors={errors}
                            data={conceptList}
                            label='Concepto'
                            className="select-basic medium select-disabled-list"
                            classNameLabel="text-black biggest text-required"
                            filter={true}
                            placeholder="Seleccionar."
                        />                             


                        <Controller
                            control={control}
                            name={"costOperation"}
                            render={({ field }) => {
                                return (
                                    <InputNumberComponent
                                        control={control}
                                        idInput={`costOperation`}
                                        label="Costo promedio"
                                        className="inputNumber-basic medium"
                                        placeholder={'0'}
                                        classNameLabel="text-black biggest text-required"
                                        errors={errors}
                                        mode="currency"
                                        currency="COP"
                                        locale="es-CO"
                                        fieldArray={true}
                                        minFractionDigits={0}
                                        maxFractionDigits={0}
                                        {...field}
                                    />
                                )

                            }}
                        />
                    </div>
                </section>

                <section className="card-user mt-14px">
                    <div className="display-align-flex-center gap-1">
                        <div className="card-user width-style width-50" >
                            <div className="title-area">
                                <p className="text-black biggest">Período 1 {periods}-1</p>
                            </div>
                            <div className='funcionality-filters-container gap-15'>
                                <Controller
                                    control={control}
                                    name={"quantityPeriod1"}
                                    render={({ field }) => {
                                        return (
                                            <InputComponent
                                                idInput={"quantityPeriod1"}
                                                className="input-basic medium"
                                                typeInput="number"
                                                label="Cantidad"
                                                register={register}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                placeholder={""}
                                                {...field}
                                            />
                                        )

                                    }}
                                />

                                <Controller
                                    control={control}
                                    name={"valuePeriod1"}
                                    render={({ field }) => {
                                        return (
                                            <InputComponent
                                                idInput={"valuePeriod1"}
                                                className="input-basic medium"
                                                typeInput="number"
                                                label="Valor"
                                                register={register}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                placeholder={""}
                                                {...field}
                                            />
                                        )

                                    }}
                                />
                            </div>
                        </div>

                        <div className="card-user width-style width-50" >
                            <div className="title-area">
                                <p className="text-black biggest">Período 2 {periods}-2</p>
                            </div>
                            <div className='funcionality-filters-container gap-15'>
                                <Controller
                                    control={control}
                                    name={"quantityPeriod2"}
                                    render={({ field }) => {
                                        return (
                                            <InputComponent
                                                idInput={"quantityPeriod2"}
                                                className="input-basic medium"
                                                typeInput="number"
                                                label="Cantidad"
                                                register={register}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                placeholder={""}
                                                {...field}
                                            />
                                        )

                                    }}
                                />
                                <Controller
                                    control={control}
                                    name={"valuePeriod2"}
                                    render={({ field }) => {
                                        return (
                                            <InputComponent
                                                idInput={"valuePeriod2"}
                                                className="input-basic medium"
                                                typeInput="number"
                                                label="Valor"
                                                register={register}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                placeholder={""}
                                                {...field}
                                            />
                                        )

                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </section>

                <section className="card-user mt-14px">
                    <div className='funcionality-filters-container gap-15'>                      
                        <Controller
                            control={control}
                            name={"subtotalVigency"}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <InputComponent
                                    idInput={"subtotalVigency"}
                                    className="input-basic medium"
                                    typeInput="number"
                                    label="Subtotal vigencia"
                                    classNameLabel="text-black biggest text-required"
                                    errors={errors}
                                    placeholder={""}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e); 
                                        setModifiedIdcCountercredit(Number(e.target.value)); 
                                    }}
                                    onBlur={onBlur} 

                                />
                            )}
                        />

                        <InputNumberComponent
                            control={control}
                            idInput={`costBillsOperation`}
                            label="Costos y gastos de operación"
                            className="inputNumber-basic medium"
                            placeholder={'0'}
                            classNameLabel="text-black biggest text-required"
                            errors={errors}
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
                            idInput={`net`}
                            label="Neto"
                            className="inputNumber-basic medium"
                            placeholder={'0'}
                            classNameLabel="text-black biggest text-required"
                            errors={errors}
                            mode="currency"
                            currency="COP"
                            locale="es-CO"
                            fieldArray={true}
                            minFractionDigits={0}
                            maxFractionDigits={0}
                            disabled
                        />
                    </div>
                    <div className='funcionality-filters-container gap-15'>
                        <InputNumberComponent
                            control={control}
                            idInput={`financialOperatorCommission`}
                            label="Comisión operador financiero"
                            className="inputNumber-basic medium"
                            placeholder={'0'}
                            classNameLabel="text-black biggest text-required"
                            errors={errors}
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
                            idInput={`resourcesCredit`}
                            label="Recursos para crédito"
                            className="inputNumber-basic medium"
                            placeholder={'0'}
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
                    </div>
                </section>

            </FormComponent>
            <div className="button-save-container-display-maestros-actas margin-right0 mr-24px">
                <ButtonComponent
                    form="createItemsForm"
                    value="Cancelar"
                    type="button"
                    className="button-cancel-text large hover-three disabled-black"
                    action={() => CancelFunction()}
                />
                <ButtonComponent
                    form="createItemsForm"
                    value="Aceptar"
                    type="submit"
                    className="button-save large disabled-black"
                />
            </div>
        </Fragment>
    )
}

export default React.memo(ItemsCreatePage);