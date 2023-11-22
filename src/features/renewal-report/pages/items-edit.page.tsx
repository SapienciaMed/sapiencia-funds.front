import React, { Fragment, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useActaItems from "../../renewal-report/hooks/item-edit.hook";
import TableGridComponent from "../../../common/components/tableGrid.component";
//import useActaCreate from "../hooks/acta-create.hook";
import { ICallRenewal } from '../../../common/interfaces/funds.interfaces';
import { IActaItems } from '../../../common/interfaces/actaItems.interface';
import { Controller } from "react-hook-form";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";


const ItemsEditePage = ({ action, acta,  }: { action, acta?: ICallRenewal,  }) => {

    const [modifiedIdcCountercredit, setModifiedIdcCountercredit] = useState(0)
    const { errors, register, showTable, tableComponentRef, datos, control, typeProgram, 
        foundList, lineList, conceptList, announcementList,periods, costBillsOperation,/* handleInputChange */ neto, 
        financialOperatorCommission, resourcesCredit, programList, CancelFunction 
    } = useActaItems(action, acta, );

    return (
        <Fragment>
            <FormComponent id="createItemsForm" className="form" >
                <div className="container-form-grid-actas">
                    <div className="container-form padding-form">
                        <div>
                            <div className='grid-form-4-container mb-24px'>
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
                                                disabled={true}
                                                {...field}
                                            />
                                        )

                                    }}
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
                                                disabled={true}
                                                {...field}
                                            />
                                        )

                                    }}
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
                                                disabled={true}
                                                {...field}
                                            />
                                        )

                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>





            </FormComponent>

        </Fragment>
    )
}

export default React.memo(ItemsEditePage);