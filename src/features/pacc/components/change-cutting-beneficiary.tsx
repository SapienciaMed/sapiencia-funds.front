import React, { useContext } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import { useForm } from 'react-hook-form';
import { EDirection } from "../../../common/constants/input.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { changeCuttingBeneficiary } from "../../../common/schemas/pacc-shema";
import { IStepCashing } from "../interface/pacc";

function ChangeCuttingBeneficiary({actualCut, idCutData}) {

    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(changeCuttingBeneficiary);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IStepCashing>({resolver})

    const onsubmitAddItem = handleSubmit((data: any) => {
        console.log('peticion', data)
        setMessage({
            show: true,
            title: "Mover beneficiario a otro corte",
            description: "¿Está segur@ de mover al beneficiari@ a otro corte?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                console.log('peticion', data)
            },
            onCancel() {
                setMessage({});
            },
            background: true,
        });
    })

    const CancelFunction = () => {
        setMessage((prev) => ({ ...prev, show: false }));
    };
    
    return (
        <>
            <div className="card-table gap-0 width-style">
                <FormComponent action={onsubmitAddItem} id="changeCuttingForm">
                    <section className='grid-form-1-container'>
                        <InputComponent
                            idInput='actualCut'
                            className="input-basic big"
                            typeInput="text"
                            label="Corte actual"
                            classNameLabel="text-black biggest"
                            direction={EDirection.column}
                            disabled
                            value={actualCut}
                        />
                    </section>
                    <section className='grid-form-1-container mt-14px '>
                        <SelectComponent
                            idInput={"idCut"}
                            control={control}
                            data={idCutData}
                            label="Corte"
                            className="select-basic big"
                            classNameLabel='text-black biggest text-with-colons text-required'
                            filter={true}
                            placeholder="Seleccionar."
                            direction={EDirection.column}
                            errors={errors}
                        />

                    </section>
                </FormComponent>
            </div>
            <div className="button-save-container-display-maestros-actas  mt-14px">
                <ButtonComponent
                    value="Cancelar"
                    type="button"
                    className="button-cancel-text large hover-three disabled-black"
                    action={() => CancelFunction()}
                />
                <ButtonComponent
                    form="changeCuttingForm"
                    value="Aceptar"
                    type="submit"
                    className="button-save large disabled-black"
                />
            </div>
        
        </>
    )
}

export default React.memo(ChangeCuttingBeneficiary)