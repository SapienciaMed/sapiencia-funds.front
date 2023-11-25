import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { ButtonComponent, FormComponent, InputComponent } from '../../../common/components/Form';
import { EDirection } from '../../../common/constants/input.enum';
import { IEditItem, IEditItemControl } from '../interface/control';
import { AppContext } from '../../../common/contexts/app.context';
import useYupValidationResolver from '../../../common/hooks/form-validator.hook';
import { editItemControl } from '../../../common/schemas/control-shema';

function EditItemControl({ contentItem, typeReportControl }: Readonly<IEditItemControl>) {
    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(editItemControl(contentItem));

    const { 
        register, 
        handleSubmit, 
        control, 
        formState: {errors},
        setValue
    } = useForm<any>({
        resolver
    });

    const getLabel = (key) => {
        const titulos = {
            programFund: 'Programa fondo línea',
            commune: 'Comuna o corregimiento',
            numberOfPreSelected: 'Nro de preseleccionados',
            quotas: 'Cupos',
            availableResource: 'Recurso disponible',
            available: 'Otorgado',
            awarde: 'Disponible',
            participation: '%Participación',
            noLegalized: 'No. Legalizados',
            financialIncome: 'Rendimientos financieros'
        };
    
        return key.map(key => titulos[key] || '');
    }

    const onSubmit = handleSubmit(async (data: IEditItem) => {
        console.log("🚀  data:", data)
    })

    useEffect(() => {
        Object.keys(contentItem).forEach(key => setValue(key, contentItem[key].value))
    },[])
    
    return (
        <div className="display-flex-direction-column full-width">
            <FormComponent action={onSubmit} id='editItemForm'>
                <section className='grid-form-3-container-area'>
                    {
                        Object.keys(contentItem).map((key, index) => {
                                return(
                                    <div key={index}> 
                                        <Controller
                                            control={control}
                                            name={key}
                                            render={({ field }) => {
                                                return(
                                                    <InputComponent
                                                        id={field.name}
                                                        idInput={field.name}
                                                        className="input-basic"                     
                                                        classNameLabel={`text-black weight-500 biggest ${!contentItem[key].isDisabled && 'text-required'}`}
                                                        typeInput="text"
                                                        register={register}
                                                        label={getLabel([key])}
                                                        direction={EDirection.column}
                                                        onChange={(value) => {
                                                            field.onChange(value);
                                                        }}
                                                        errors={errors}
                                                        disabled={contentItem[key].isDisabled}
                                                    />
                                                )
                                            }}
                                        /> 
                                    </div> 
                                )
                            }
                        )
                        
                    }
                </section>
                <section className="display-justify-flex-center mt-14px">
                    <ButtonComponent
                        value="Cancelar"
                        type="button"
                        className="button-cancel-text large hover-three disabled-black"
                        action={() => setMessage((prev) => ({ ...prev, show: false })) }
                    />
                    <ButtonComponent
                        value="Guardar"
                        type="submit"
                        className="button-save large disabled-black"
                    />
                </section>
            </FormComponent>
        </div>
    )
           
}

export default React.memo(EditItemControl);


