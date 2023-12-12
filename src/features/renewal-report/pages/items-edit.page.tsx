import React from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../common/components/Form";
import useActaItems from "../../renewal-report/hooks/item-edit.hook";
import { ICallRenewal } from "../../../common/interfaces/funds.interfaces";
import { Controller } from "react-hook-form";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";


const ItemsEditePage = ({ renewalitem, renewal, selectedperiodo, loadTableData }: { renewalitem, renewal?: ICallRenewal, selectedperiodo, loadTableData }) => {


    const { errors, control, updateDataGridRenewal, CancelFunction, register
    } = useActaItems(renewalitem, renewal, selectedperiodo, loadTableData);

    return (
        <Fragment>
            <FormComponent id="createItemsForm" className="form" >
                <div className="container-form-grid-actas">
                    <div className="container-form padding-form">
                        <div>
                            <div className='grid-form-4-container mb-24px'>
                                <Controller
                                    control={control}
                                    name={"fund"}
                                    render={({ field }) => {
                                        return (
                                            <InputComponent
                                                id={field.name}
                                                idInput={field.name}
                                                label="Fondo"
                                                className="inputNumber-basic medium"
                                                typeInput="text"
                                                //placeholder={renewal ? renewal.fund : ""}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                register={register}
                                                disabled={true}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                <Controller
                                    control={control}
                                    name={"enabled"}
                                    render={({ field }) => {
                                        return (
                                            <InputNumberComponent
                                                control={control}
                                                idInput={`enabled`}
                                                label="Nro habilitados"
                                                className="inputNumber-basic medium"
                                                placeholder={renewal ? renewal.enabled : ""}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                <Controller
                                    control={control}
                                    name={"renewed"}
                                    render={({ field }) => {
                                        return (
                                            <InputNumberComponent
                                                control={control}
                                                idInput={`renewed`}
                                                label="Nro renovados"
                                                className="inputNumber-basic medium"
                                                placeholder={renewal ? renewal.renewed : ""}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                fieldArray={true}
                                                minFractionDigits={0}
                                                maxFractionDigits={0}
                                                disabled={true}
                                                {...field}
                                            />
                                        );
                                    }}
                                />

                                <Controller
                                    control={control}
                                    name={"percentage"}
                                    render={({ field }) => {
                                        return (
                                            <InputComponent
                                                id={field.name}
                                                idInput={field.name}
                                                label="Porcentaje"
                                                className="inputNumber-basic medium"
                                                typeInput="text"
                                                //placeholder={renewal ? renewal.fund : ""}
                                                classNameLabel="text-black biggest text-required"
                                                errors={errors}
                                                register={register}
                                                disabled={true}
                                                {...field}
                                            />                                           
                                        );
                                    }}
                                />

                            </div>

                        </div>

                    </div>
                </div>

                <div className="button-save-container-display m-top-20">
                    <ButtonComponent
                        form="searchBudget"
                        value={"Cancelar"}
                        className="button-clean medium"
                        type="button"
                        action={() => {
                            CancelFunction()
                        }
                        }
                    />
                    <ButtonComponent
                        form="EditRenewal"
                        value={`Guardar`}
                        className="button-save large hover-three disabled-black"
                        action={() => {
                            updateDataGridRenewal()
                        }}
                    />
                </div>

            </FormComponent>

        </Fragment>
    )
}

export default React.memo(ItemsEditePage);
