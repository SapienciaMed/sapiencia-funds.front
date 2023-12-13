import React, { useContext, useEffect, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import { useForm } from 'react-hook-form';
import { EDirection } from "../../../common/constants/input.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { changeCuttingBeneficiary } from "../../../common/schemas/pacc-shema";
import { IStepCashing } from "../interface/pacc";
import { usePaccServices } from "../hook/pacc-serviceshook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";

interface IProp{
    idBenef: number,
    idCutData: IDropdownProps[],
    typeState: number
}

function ChangeCuttingBeneficiary({idBenef, idCutData,typeState }:Readonly<IProp>) {

    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(changeCuttingBeneficiary);
    const { GeBeneficiaryById, UpdateCutBeneficiary } = usePaccServices(typeState)
    const [actualCut, setActualCut] = useState('')
    const [ cut, setCut ] = useState<IDropdownProps[]>([])

    const formatDate = (fechaISO: string) => {
        const fecha = new Date(fechaISO);
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth() + 1; 
        const anio = fecha.getUTCFullYear();
        const fechaFormateada = dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + anio;   
        return fechaFormateada;
    }

    useEffect(() => {
        GeBeneficiaryById(String(idBenef)).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                const item = response.data
                setActualCut(`${item.cut} - desde ${formatDate(item.dateIncomeCut)} hasta ${formatDate(item.dateFinallyCut)}`)
                setCut(idCutData.filter(us => us.name != item.cut))
            }
        })
    },[])

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<IStepCashing>({resolver})

    const onsubmitAddItem = handleSubmit((data: any) => {
        setMessage({
            show: true,
            title: "Mover beneficiario a otro corte",
            description: "¿Estás segur@ de mover al beneficiari@ a otro corte?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                const data = {
                    id: idBenef,
                    cut: getValues('idCut')
                }
                UpdateCutBeneficiary(data).then(response => {
                    if(response.operation.code === EResponseCodes.OK){
                        setMessage({});
                        window.location.reload();     
                    }
                
                })
            },
            onCancel() {
                setMessage({});
            },
            background: true,
        });
    })

    const CancelFunction = () => { setMessage((prev) => ({ ...prev, show: false })) };
    
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
                    <section className='grid-form-1-container mt-14px'>
                        <SelectComponent
                            idInput={"idCut"}
                            control={control}
                            data={cut}
                            label="Corte"
                            className="select-basic big select-disabled-list"
                            classNameLabel='text-black biggest text-with-colons text-required'
                            filter={true}
                            placeholder="Seleccionar"
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