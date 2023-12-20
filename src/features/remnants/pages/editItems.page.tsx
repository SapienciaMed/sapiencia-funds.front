import React, { Fragment } from 'react'
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from '../../../common/components/Form';
import useRemnants from '../hooks/remnants.hook';
import Svgs from '../../../public/images/icons/svgs';
import TableComponent from '../../../common/components/table.component';
import { Controller } from 'react-hook-form';
import useEditItem from '../hooks/editItem.hook';
import { InputNumberComponent } from '../../../common/components/Form/input-number.component';

const editItemsPage = ({ item, loadTableData }) => {

    const { control, errors, register, onSubmit, CancelFunction } = useEditItem(item, loadTableData);

    return (
        <Fragment>
            <div className="container-sections mt-24px ml-14px mr-14px p-0">
                <FormComponent id="editItemForm" className="form-signIn" action={onSubmit}>
                    <div className="grid-form-4-container mb-24px">
                        <Controller
                            control={control}
                            name={"communityFund"}
                            render={({ field }) => {
                                return (
                                    <InputComponent
                                        idInput={field.name}
                                        errors={errors}
                                        typeInput={"text"}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        register={register}
                                        disabled
                                        className="input-basic medium"
                                        classNameLabel="text-black big medium"
                                        label={
                                            <>
                                                ID comuna
                                            </>
                                        }
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name={"remaining"}
                            render={({ field }) => {
                                return (
                                    <InputNumberComponent
                                        control={control}
                                        idInput={field.name}
                                        className="inputNumber-basic medium"
                                        mode="currency"
                                        currency="COP"
                                        locale="es-CO"
                                        fieldArray={true}
                                        label="Restante"
                                        classNameLabel="text-black big medium "
                                        errors={errors}
                                        placeholder={""}
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name={"communityFund"}
                            render={({ field }) => {
                                return (
                                    <InputComponent
                                        idInput={field.name}
                                        errors={errors}
                                        typeInput={"text"}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        disabled
                                        className="input-basic medium"
                                        classNameLabel="text-black big medium"
                                        label={
                                            <>
                                                ID fondo
                                            </>
                                        }
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name={"averageCost"}
                            render={({ field }) => {
                                return (
                                    <InputNumberComponent
                                        control={control}
                                        idInput={field.name}
                                        className="inputNumber-basic medium"
                                        mode="currency"
                                        currency="COP"
                                        locale="es-CO"                                       
                                        label="Costo promedio"
                                        classNameLabel="text-black big medium text-required"
                                        errors={errors}
                                        placeholder={""}
                                        {...field}
                                    />

                                );
                            }}
                        /> 
                    </div>
                    <div className="grid-form-3-container mb-24px">
                        <Controller
                            control={control}
                            name={"quotas"}
                            render={({ field }) => {
                                return (
                                    <InputComponent
                                        idInput={field.name}
                                        errors={errors}
                                        typeInput={"text"}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        disabled
                                        className="input-basic medium"
                                        classNameLabel="text-black big medium"
                                        label={
                                            <>
                                                Cupos
                                            </>
                                        }
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name={"quotaResource"}
                            render={({ field }) => {
                                return (
                                    <InputNumberComponent
                                        control={control}
                                        idInput={field.name}
                                        className="inputNumber-basic medium"
                                        mode="currency"
                                        currency="COP"
                                        locale="es-CO"
                                        fieldArray={true}
                                        label="Recurso con cupos"
                                        classNameLabel="text-black big medium text-required"
                                        errors={errors}
                                        placeholder={""}
                                        {...field}
                                        disabled
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name={"residual"}
                            render={({ field }) => {
                                return (
                                    <InputNumberComponent
                                        control={control}
                                        idInput={field.name}
                                        className="inputNumber-basic medium"
                                        mode="currency"
                                        currency="COP"
                                        locale="es-CO"
                                        fieldArray={true}
                                        label="Residual"
                                        classNameLabel="text-black big medium text-required"
                                        errors={errors}
                                        placeholder={""}
                                        {...field}
                                        disabled
                                    />
                                );
                            }}
                        />

                    </div>


                </FormComponent>
            </div>
            <div className="button-save-container-display-maestros-actas margin-right0 mr-24px">
                <ButtonComponent
                    form="editItemForm"
                    value="Cancelar"
                    type="button"
                    className="button-cancel-text large hover-three disabled-black"
                    action={() => CancelFunction()}
                />
                <ButtonComponent
                    form="editItemForm"
                    value="Guardar"
                    type="submit"
                    className="button-save large disabled-black"
                />
            </div>

        </Fragment>
    )
}

export default React.memo(editItemsPage);


