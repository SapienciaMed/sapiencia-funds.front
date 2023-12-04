import React from "react";
import { FormComponent, InputComponent, SelectComponent } from "../../../../common/components/Form";
import { useForm } from 'react-hook-form';
import { EDirection } from "../../../../common/constants/input.enum";

function ManageTransfer(){

    const {
        handleSubmit,
        register, 
        formState: { errors },
        reset,
        watch,
        control,
        setValue
    } = useForm()

    return(
        <div className="card-table gap-0 full-width">
            <FormComponent id="formManageTransfer" action={() => {}}>
                <div className="grid-form-2-container ">
                    <SelectComponent
                        idInput={"state"}
                        control={control}
                        errors={errors}
                        data={[
                            { name: "Aprobado", value: "Aprobado" },
                            { name: "Rechazado", value: "Rechazado" },
                        ]}
                        label="Estado"
                        className="select-basic medium select-disabled-list"
                        classNameLabel="text-black biggest"
                        filter={true}
                        placeholder="Seleccionar."
                    />
                    <InputComponent
                        idInput={"time"}
                        className="input-basic medium"
                        typeInput="text"
                        label="Horas realizadas"
                        register={register}
                        classNameLabel="text-black big"
                        direction={EDirection.column}
                    />
                </div>

            </FormComponent>
        </div>
    )
}

export default React.memo(ManageTransfer);