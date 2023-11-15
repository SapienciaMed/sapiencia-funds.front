import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import { useWidth } from "../../../common/hooks/use-width";
import { FiEdit2 } from "react-icons/fi";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import { EDirection } from "../../../common/constants/input.enum";
import useActaData from "../hooks/acta.hook";
import { Controller } from 'react-hook-form';


function ActaPage(){
    const {width} = useWidth()
    const { errors, isBtnDisable, control, navigate, register, 
        onSubmitSearch, reset, handleModifyActa } = useActaData()


    return(
        <div className="main-page">
            <div className="text-black weight-500 bold extra-large">Acta</div>
            <div className='card-table gap-0 mt-14px'>
                <section className="title-area">
                    <div className="text-black large">Buscar acta</div>

                    <div className={`${width < 800 ? 'display-justify-space-between-pac' : 'display-align-flex-center'} gap-0 gap-05`}>
                        <div 
                            className={`title-button ${width < 300 ? 'font-medium' :'font-big' }`}
                            onClick={() => { navigate('../crear') }}
                        >
                            Crear acta <BiPlusCircle />
                        </div>
                        <div
                            className={`title-button ${width < 300 ? 'font-medium' :'font-big' }`}
                            onClick={handleModifyActa}
                        >
                            <div className="button-border">
                                Modificar acta <FiEdit2 />
                            </div>
                        </div>

                    </div>

                </section>

                <FormComponent id="searchActaForm" action={onSubmitSearch}>
                    <div className="one-filter-container">
                        <Controller
                            control={control}
                            name={"actaNro"}
                            defaultValue='' 
                            render={({ field }) => {
                                return(
                                    <InputComponent
                                        id={field.name}
                                        idInput={field.name}
                                        className="input-basic color-default-value"
                                        typeInput="text"
                                        register={register}
                                        label="Consecutivo de acta nro"
                                        classNameLabel="text-black weight-500 biggest text-required"
                                        direction={EDirection.column}
                                        onChange={(value) => { field.onChange(value) }}
                                        errors={errors}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className="funcionality-buttons-container">
                        <span className="bold text-center button" 
                            onClick={() => {
                                reset()
                            }}
                        >
                            Limpiar
                        </span>
                        <ButtonComponent
                            className="button-main huge hover-three"
                            value="Buscar"
                            type="submit"
                            form="searchActaForm"
                            disabled={!isBtnDisable}
                        />
                    </div>

                </FormComponent>

            </div>
                                
        </div>
    )
}

export default React.memo(ActaPage);