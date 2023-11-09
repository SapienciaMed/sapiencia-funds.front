import React from "react";
import { FormComponent, InputComponent } from "../../../common/components/Form";
import { useForm } from 'react-hook-form';
import { EDirection } from "../../../common/constants/input.enum";
import BasicTableComponent from "../../../common/components/basic-table.component";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";

function SearchResulPage() {
    
    const { register, handleSubmit, formState: { errors }, control} = useForm();

    
    return(
        <div className='main-page'>
            <div className="title-area">
                <p className="text-black huge">Visualizar acta</p>
            </div>

                <FormComponent action={() => {}}>
                    <section className="card-user">
                        <div className='grid-form-4-container gap-15'>
                            <InputComponent
                                idInput={"consecutiveNro"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Consecutivo de acta nro"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
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
                                idInput={"consecutiveNro"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Estado"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
                             <InputComponent
                                idInput={"projectNumber"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Número proyecto"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
                        </div>
                        <div className='grid-form-3-container gap-15'>
                            <InputComponent
                                idInput={"periodsByTerm"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Periodos por vigencia"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
                            <InputComponent
                                idInput={"initialCall"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Convocatoria inicial"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
                            <InputComponent
                                idInput={"minimumSalary"}
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
                            <InputComponent
                                idInput={"costAndLogistics"}
                                className="input-basic medium" 
                                typeInput="text"
                                label="Costo y gastos de operación logística"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
                            <InputComponent
                                idInput={"financialOperator"}
                                className="input-basic medium" 
                                typeInput="text"
                                label="Comisión operador financiero"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
                            <InputComponent
                                idInput={"financialTransactionMB"}
                                className="input-basic medium" 
                                typeInput="text"
                                label="Operación financiera MB"
                                register={register}
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                            />
                        </div>
                    </section>

                    <section className="card-user mt-14px">

                        Tablaaaa
                       
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
                                    label="Costo y gasto de operación"
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
                                    idInput={`totalFinancialOperatorCommission`}
                                    label="Total comisión operador financiero"
                                    className="inputNumber-basic medium "
                                    placeholder={'0'}
                                    classNameLabel="text-black big"
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
                                idInput={`vigency2`}
                                label="Verificador 2"
                                className="inputNumber-basic medium"
                                placeholder={'0'}
                                classNameLabel="text-black big"
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
                                idInput={`techo`}
                                label="techo"
                                className="inputNumber-basic medium"
                                placeholder={'0'}
                                classNameLabel="text-black big"
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

        </div>
           
    )
}

export default React.memo(SearchResulPage);