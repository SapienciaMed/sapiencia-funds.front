import React from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import { EDirection } from "../../../common/constants/input.enum";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import useSearcResult from "../hooks/search-result.hook";
import BasicTableComponent from "../../../common/components/basic-table.component";
import Svgs from "../../../public/images/icons/svgs";
import { Controller } from 'react-hook-form';
import { ISearchResultProp } from "../interface/Acta";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { useWidth } from "../../../common/hooks/use-width";
import TabSearchResultMobil from "./tab-search-result-mobil";

function SearchResulPage({ valueAction }: Readonly<ISearchResultProp>) {
    
    const { control, tableComponentRef, tableColumns, dataTableServices, tableColumnsUsers, dataGridUsersServices, 
        errors, times, activeUserList, dataGridUsers, dataGridItems, tableActionsUser,
        register, addItem, onSubmit, addUser, onCancel, downloadCollection } = useSearcResult({ valueAction })
    
    const { width } = useWidth()

    return(
        <div className='main-page'>
            <div className="title-area">
                <p className="text-black huge">{valueAction == 'edit' ? 'Modificar acta' : 'Visualizar acta'}</p>
            </div>

            <FormComponent action={onSubmit} id="acta-form">
                <section className="card-user">
                    <div className='grid-form-3-container gap-15'>
                        <InputComponent
                            idInput={"consecutiveNroPrevious"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Consecutivo de acta nro anterior"
                            register={register}
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                        />
                        <InputComponent
                            idInput={"idStatus"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Estado"
                            register={register}
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                        />
                        {
                            valueAction == 'edit' ?
                                <SelectComponent
                                    idInput={"numberProject"}
                                    control={control}
                                    errors={errors}
                                    data={[
                                        {name: '1', value: '1'},
                                        {name: '2', value: '2'},
                                    ]}
                                    label="Número proyecto"
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel={`text-black big text-with-colons ${valueAction == 'edit' && 'text-required'}`}
                                    filter={true}
                                    placeholder="Seleccionar."
                                    direction={EDirection.column}
                                    disabled={valueAction != 'edit'}
                                />
                            :    <InputComponent
                                    idInput={"numberProject"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Número proyecto"
                                    register={register}
                                    classNameLabel="text-black big text-with-colons"
                                    direction={EDirection.column}
                                    disabled
                                />
                        }
                    </div>
                    <div className='grid-form-3-container gap-15'>

                        {
                            valueAction == 'edit' ?
                                <SelectComponent
                                    idInput={"periodVigency"}
                                    control={control}
                                    errors={errors}
                                    data={[
                                        {name: '1', value: '1'},
                                        {name: '2', value: '2'},
                                    ]}
                                    label="Periodos por vigencia"
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel={`text-black big text-with-colons ${valueAction == 'edit' && 'text-required'}`}
                                    direction={EDirection.column}
                                    filter={true}
                                    placeholder="Seleccionar."
                                    disabled={valueAction != 'edit'}
                                />
                            :   <InputComponent
                                    idInput={"periodVigency"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Periodos por vigencia"
                                    register={register}
                                    classNameLabel="text-black big text-with-colons"
                                    direction={EDirection.column}
                                    disabled
                                />
                        }
                        <Controller
                            control={control}
                            name={"announcementInitial"}
                            render={({ field }) => {
                                return (
                                    <InputComponent
                                        id={field.name}
                                        idInput={field.name}
                                        className="input-basic medium"
                                        typeInput="text"
                                        label="Convocatoria inicial"
                                        register={register}
                                        classNameLabel={`text-black big text-with-colons ${valueAction == 'edit' && 'text-required'}`}
                                        errors={errors}
                                        disabled={valueAction != 'edit'}
                                        {...field}
                                    />
                                )

                            }}
                        />
                        <InputComponent
                            idInput={"salaryMin"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Salario mínimo"
                            register={register}
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                        />
                    </div>
                </section>

                <section className="card-user mt-14px">
                    <div className="title-area">
                        <label className="text-black large" style={{margin: '0px'}}>Tasas</label>
                    </div>
                    <div className='grid-form-3-container gap-15'>
                        <InputNumberComponent
                            idInput='costsExpenses'
                            className="inputNumber-basic medium"
                            label="Costo y gastos de operación logística"
                            classNameLabel={`text-black big text-with-colons ${valueAction == 'edit' && 'text-required'}`}
                            errors={errors}
                            placeholder={""}
                            direction={EDirection.column}
                            disabled={valueAction != 'edit'}
                            suffix="%"
                            mode="decimal"
                            minFractionDigits={1}
                            maxFractionDigits={1}
                            min={0}
                            max={100}
                            control={control}
                        />
                        <InputNumberComponent
                            idInput='OperatorCommission'
                            className="inputNumber-basic medium"
                            label="Comisión operador financiero"
                            classNameLabel={`text-black big text-with-colons ${valueAction == 'edit' && 'text-required'}`}
                            errors={errors}
                            placeholder={""}
                            direction={EDirection.column}
                            disabled={valueAction != 'edit'}
                            suffix="%"
                            mode="decimal"
                            minFractionDigits={1}
                            maxFractionDigits={1}
                            min={0}
                            max={100}
                            control={control}
                        />
                         <InputNumberComponent
                            idInput='financialOperation'
                            className="inputNumber-basic medium"
                            label="Operación finaciera MB"
                            classNameLabel={`text-black big text-with-colons ${valueAction == 'edit' && 'text-required'}`}
                            errors={errors}
                            placeholder={""}
                            direction={EDirection.column}
                            disabled={valueAction != 'edit'}
                            suffix="%"
                            mode="decimal"
                            minFractionDigits={1}
                            maxFractionDigits={1}
                            min={0}
                            max={100}
                            control={control}
                        />
                    </div>
                </section>

                {
                    valueAction == 'edit' &&
                    <div className="button-save-container-display-actas margin-right0 mr-24px">
                        <ButtonComponent
                            value="Agregar item"
                            action={() => { addItem() }}
                            className="button-save large disabled-black"
                        />
                    </div>
                }

                {
                    width <= 830 
                    ? ( 
                        <TabSearchResultMobil 
                            control={control}
                            dataGridItems={dataGridItems}
                            tableColumns={tableColumns}
                            tableComponentRef={tableComponentRef}
                            dataTableServices={dataTableServices}
                            register={register}
                            valueAction={valueAction}
                        />
                    )
                    : (
                        <> 
                            <section className="card-user mt-14px">

                                <BasicTableComponent
                                    ref={tableComponentRef}
                                    data={valueAction ? dataGridItems : dataTableServices}
                                    columns={tableColumns}
                                    titleMessageModalNoResult="Registro no existente"
                                    isShowModal={true}
                                    secondaryTitle={"Acta control financiero"}
                                    classSizeTable="size-table-wd-150"
                                />
                                
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
                                            // value={String(totalQuantityPeriod1)}
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
                                            // value={String(totalQuantityPeriod2)}
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

                            <section className="card-user mt-14px">
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
                        
                        </>

                    )
                }

                {
                    valueAction == 'edit' ? (
                       <>
                            <section className="card-user mt-14px">
                                <div className="title-area">
                                    <label className="text-black extra-large grid-span-4-columns mb-18px">Citar</label>
                                </div>
                                <div className='grid-form-3-container mb-24px'>
                                    <DatePickerComponent
                                        idInput="dateCitation"
                                        control={control}
                                        label={"Fecha"}
                                        errors={errors}
                                        classNameLabel="text-black biggest medium text-required"
                                        className="dataPicker-basic  medium "
                                        placeholder="DD/MM/YYYY"
                                        dateFormat="dd/mm/yy"
                                    />

                                    <SelectComponent
                                        idInput={"timeCitation"}
                                        control={control}
                                        errors={errors}
                                        data={times}
                                        label='Hora'
                                        className="select-basic medium select-disabled-list"
                                        classNameLabel="text-black biggest text-required"
                                        filter={true}
                                        placeholder="Seleccionar."

                                    />
                                    <SelectComponent
                                        idInput={"user"}
                                        control={control}
                                        errors={errors}
                                        data={activeUserList}
                                        label='Usuario-Nombre completo'
                                        className="select-basic medium select-disabled-list"
                                        classNameLabel="text-black biggest text-required"
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
                            </section>

                            <section className="card-user mt-14px">
                                <BasicTableComponent
                                    ref={tableComponentRef}
                                    data={dataGridUsers}
                                    columns={tableColumnsUsers}
                                    actions={tableActionsUser}
                                    titleMessageModalNoResult="Registro no existente"
                                    isShowModal={true}
                                    secondaryTitle={""}
                                />
                            </section>
                       </> 
                    ):
                    (
                        <section className="card-user mt-14px">
                            <div className="title-area">
                                <label className="text-black large" style={{margin: '0px'}}>Citación</label>
                            </div>
                            <BasicTableComponent
                                ref={tableComponentRef}
                                data={dataGridUsersServices}
                                columns={tableColumnsUsers}
                                isShowModal={true}
                                secondaryTitle={"Citación"}  
                                showPaginator={false}   
                            />
                        </section>               
                    )
                    
                }

            </FormComponent>

            {
                valueAction != 'edit' ?
                    <div className="display-justify-flex-end ">
                        <ButtonComponent
                            value={
                                <div className="container-buttonText">
                                    <span>Descargar</span>
                                    <Svgs svg="excel" width={23.593} height={28.505} />
                                </div>
                            }
                            className="button-download large "
                            action={downloadCollection}
                        />
                    </div>
                :
                <div className="funcionality-buttons-container">
                    <ButtonComponent
                        form='useQueryForm'
                        value="Cancelar"
                        type="button"
                        className="button-clean-fields bold"
                        action={onCancel}
                    />
                    <ButtonComponent
                        className="button-main huge hover-three"
                        value="Guardar"
                        type="submit"
                        form="acta-form"
                        // disabled={!isBtnDisable}
                    />
                </div>
            }


        </div>
           
    )
}

export default React.memo(SearchResulPage);