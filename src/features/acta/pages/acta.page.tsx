import React, { useContext } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { useWidth } from "../../../common/hooks/use-width";
import { FiEdit2 } from "react-icons/fi";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import { EDirection } from "../../../common/constants/input.enum";
import useActaData from "../hooks/acta.hook";
import { Controller } from 'react-hook-form';
import { AppContext } from "../../../common/contexts/app.context";
import { ProgressSpinner } from "primereact/progressspinner";


function ActaPage(){
    const {width} = useWidth()
    const { validateActionAccess } = useContext(AppContext);
    const { errors, isBtnDisable, control, showSpinner, navigate, register, 
        onSubmitSearch, reset, handleModifyActa } = useActaData()


    return(
        <div className="main-page">
            <div className="text-black weight-500 extra-large">Acta</div>
            <div className='card-table gap-0 mt-14px'>
                <section className="title-area-2">
                    <div className="text-black large">Buscar acta</div>

                    <div className={`${width < 1024 ? 'display-justify-flex-center' : 'display-align-flex-center'} gap-0 gap-05`}>
                        {validateActionAccess('CREAR_ACTAS') && (
                            <div 
                                className={`title-button ${width < 300 ? 'font-medium' :'font-big' }`}
                                onClick={() => { navigate('../crear') }}
                            >
                                Crear acta <BiPlusCircle />
                            </div>
                        )}

                        {
                            validateActionAccess('EDITAR_ACTAS') &&
                                <div
                                    className={`title-button ${width < 300 ? 'font-medium' :'font-big' }`}
                                    onClick={handleModifyActa}
                                >
                                    <div className="button-border">
                                        Modificar acta <FiEdit2 />
                                    </div>
                                </div>
                        }
                        

                    </div>

                </section>
                {
                    showSpinner && <ProgressSpinner style={{width: '25px', height: '25px'}}  animationDuration=".5s" />
                }
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
                        <span className="bold text-center text-black biggest button" 
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