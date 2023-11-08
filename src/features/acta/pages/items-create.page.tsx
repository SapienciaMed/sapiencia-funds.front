import React, { Fragment, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useActaItems from "../hooks/items.hook";
import TableGridComponent from "../../../common/components/tableGrid.component";
import useActaCreate from "../hooks/acta-create.hook";
import { IActa } from '../../../common/interfaces/acta.interface';
import { IActaItems } from '../../../common/interfaces/actaItems.interface';
import { Controller } from "react-hook-form";


const ItemsCreatePage = ({ action, acta, actaItems }: { action, acta?: IActa, actaItems?: IActaItems }) => {

    const [modifiedIdcCountercredit, setModifiedIdcCountercredit] = useState(0)
    const { errors, register, onsubmitAddItem, showTable, tableComponentRef, datos, control, typeProgram, foundList, lineList, conceptList, announcementList, costBillsOperation,/* handleInputChange */ neto, financialOperatorCommission, resourcesCredit, programList, CancelFunction } = useActaItems(action, acta, actaItems, modifiedIdcCountercredit);

    return (
        <Fragment>
            <FormComponent id="createItemsForm" className="form" action={onsubmitAddItem}>
                <div className="container-form-grid-actas">
                    <div className="container-form padding-form">
                        <div>
                            <div className='grid-form-3-container mb-24px'>
                                <SelectComponent
                                    idInput={"program"}
                                    control={control}
                                    errors={errors}
                                    data={programList}
                                    label={
                                        <>
                                            Programa <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."
                                />
                                <SelectComponent
                                    idInput={"found"}
                                    control={control}
                                    errors={errors}
                                    data={foundList}
                                    label={
                                        <>
                                            Fondo <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."
                                />
                                <SelectComponent
                                    idInput={"line"}
                                    control={control}
                                    errors={errors}
                                    data={lineList}
                                    label={
                                        <>
                                            Línea <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."
                                />
                            </div>
                            <div className='grid-form-3-container '>
                                <SelectComponent
                                    idInput={"announcement"}
                                    control={control}
                                    errors={errors}
                                    data={announcementList}
                                    label={
                                        <>
                                            Convocatoria <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."
                                />
                                <SelectComponent
                                    idInput={"concept"}
                                    control={control}
                                    errors={errors}
                                    data={conceptList}
                                    label={
                                        <>
                                            Concepto <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccionar."
                                />
                                {/* <InputComponent
                                    idInput={"costOperation"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Costo promedio"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                /> */}

                                <Controller
                                    control={control}
                                    name={"costOperation"}
                                    render={({ field }) => {
                                        return (
                                            <InputComponent
                                                idInput={"costOperation"}
                                                className="input-basic medium"
                                                typeInput="number"
                                                label="Comisión operador financiero"
                                                register={register}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                placeholder={""}
                                                //disabled={checked}
                                                {...field}
                                            />
                                        )

                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-container">
                    <div className="container-form-grid-actas flex-half">
                        <div className="container-form padding-form">
                            <div className="label-container">
                                <label className="text-black large medium grid-span-2-columns mb-24px">Período 1</label>
                            </div>
                            <div>
                                <div className='grid-form-2-container mb-24px'>
                                    {/*  <InputComponent
                                        idInput={"quantityPeriod1"}
                                        className="input-basic medium"
                                        typeInput="text"
                                        label="Cantidad"
                                        register={register}
                                        classNameLabel="text-black biggest text-required"
                                        //direction={EDirection.column}
                                        errors={errors}
                                        placeholder={""}
                                    /> */}
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
                                                    //disabled={checked}
                                                    {...field}
                                                />
                                            )

                                        }}
                                    />
                                    {/*  <InputComponent
                                        idInput={"valuePeriod1"}
                                        className="input-basic medium"
                                        typeInput="text"
                                        label="Costo promedio"
                                        register={register}
                                        classNameLabel="text-black biggest text-required"
                                        //direction={EDirection.column}
                                        errors={errors}
                                        placeholder={""}
                                    /> */}

                                    <Controller
                                        control={control}
                                        name={"valuePeriod1"}
                                        render={({ field }) => {
                                            return (
                                                <InputComponent
                                                    idInput={"valuePeriod1"}
                                                    className="input-basic medium"
                                                    typeInput="number"
                                                    label="Costo promedio"
                                                    register={register}
                                                    classNameLabel="text-black biggest text-required"
                                                    errors={errors}
                                                    placeholder={""}
                                                    //disabled={checked}
                                                    {...field}
                                                />
                                            )

                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-form-grid-actas flex-half">
                        <div className="container-form padding-form">
                            <div className="label-container">
                                <label className="text-black large medium grid-span-2-columns mb-24px">Período 2</label>
                            </div>
                            <div>
                                <div className='grid-form-2-container mb-24px'>
                                    {/*  <InputComponent
                                        idInput={"quantityPeriod2"}
                                        className="input-basic medium"
                                        typeInput="text"
                                        label="Cantidad"
                                        register={register}
                                        classNameLabel="text-black biggest text-required"
                                        //direction={EDirection.column}
                                        errors={errors}
                                        placeholder={""}
                                    /> */}
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
                                                    //disabled={checked}
                                                    {...field}
                                                />
                                            )

                                        }}
                                    />
                                    {/*  <InputComponent
                                        idInput={"valuePeriod2"}
                                        className="input-basic medium"
                                        typeInput="text"
                                        label="Costo promedio"
                                        register={register}
                                        classNameLabel="text-black biggest text-required"
                                        //direction={EDirection.column}
                                        errors={errors}
                                        placeholder={""}
                                    /> */}
                                    <Controller
                                        control={control}
                                        name={"valuePeriod2"}
                                        render={({ field }) => {
                                            return (
                                                <InputComponent
                                                    idInput={"valuePeriod2"}
                                                    className="input-basic medium"
                                                    typeInput="number"
                                                    label="Costo promedio"
                                                    register={register}
                                                    classNameLabel="text-black biggest text-required"
                                                    errors={errors}
                                                    placeholder={""}
                                                    //disabled={checked}
                                                    {...field}
                                                />
                                            )

                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-form-grid-actas">
                    <div className="container-form padding-form">
                        <div>
                            <div className='grid-form-3-container mb-24px'>
                                {/*    <InputComponent
                                    idInput={"subtotalVigency"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label=" Subtotal vigencia"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    errors={errors}
                                    placeholder={""}
                                    onChange={handleInputChange}
                                /> */}

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
                                                onChange(e); // Esto informa a react-hook-form del cambio
                                                setModifiedIdcCountercredit(Number(e.target.value)); // Aquí ejecutas tu lógica adicional
                                            }}
                                            onBlur={onBlur} // Esto es opcional si necesitas el evento onBlur
                                           
                                        />
                                    )}
                                />



                                <InputComponent
                                    idInput={"costBillsOperation"}
                                    className="input-basic medium"
                                    typeInput="number"
                                    label="Costos y gastos de operación"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    errors={errors}
                                    disabled
                                    value={costBillsOperation}
                                />
                                <InputComponent
                                    idInput={"net"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Neto"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                    value={neto}
                                />
                            </div>
                            <div className='grid-form-3-container '>
                                <InputComponent
                                    idInput={"financialOperatorCommission"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Comisión operador financiero"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                    value={financialOperatorCommission}
                                />
                                <InputComponent
                                    idInput={"resourcesCredit"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Recursos para crédito"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                    value={resourcesCredit}
                                />
                            </div>
                        </div>
                    </div>
                </div>







            </FormComponent>
            <div className="button-save-container-display-maestros margin-right0 mr-24px">
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