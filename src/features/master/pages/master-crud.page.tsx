import React, { Fragment } from 'react'
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from '../../../common/components/Form';
import { InputText } from 'primereact/inputtext';
import { TextAreaComponent } from '../../../common/components/Form/input-text-area.component';
import useMasterCrud from '../hooks/master-crud.hook';
import { useForm } from 'react-hook-form';
import { IMaster } from '../../../common/interfaces/master.interface';
import { Controller } from "react-hook-form";

interface IPropsMasterCrud {
    action: string;
}

const MasterCrudPage = ({ action }) => {

    const { typeMasterList, control, errors, register, onsubmitCreate,CancelFunction } = useMasterCrud();

    return (
        <Fragment>
            <div className="title-area ">
                <p className="text-black huge ml-24px mt-20px mg-0">Crear maestro</p>
            </div>
            <div className="container-form-grid mb-24px">
                <div className="container-form padding-form">

                    <div>
                        <FormComponent id="createMasterForm" className="form-signIn" action={onsubmitCreate}>
                            <div className='grid-form-4-container'>
                                <SelectComponent
                                    idInput={"codtlmo"}
                                    control={control}

                                    errors={errors}
                                    data={typeMasterList}
                                    label={
                                        <>
                                            Tipo maestro <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccione."                                    
                                />

                                <InputComponent
                                    idInput={"name"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Nuevo maestro"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                            </div>
                            <div className='mt-24px'>
                                <Controller
                                    control={control}
                                    name={"description"}
                                    defaultValue=""
                                    render={({ field }) => {
                                        return (
                                            <TextAreaComponent
                                                id={field.name}
                                                idInput={field.name}
                                                value={`${field.value}`}
                                                label="Descripción"
                                                className="text-area-basic"
                                                classNameLabel="text-black biggest"
                                                rows={4}
                                                placeholder="Escribe aquí"
                                                register={register}
                                                onChange={field.onChange}
                                                errors={errors}
                                                characters={500}
                                            ></TextAreaComponent>
                                        );
                                    }}
                                />
                            </div>
                        </FormComponent>
                    </div>
                </div>

                <div className="button-save-container-display-maestros">
                    <ButtonComponent
                        form="createMasterForm"
                        value="Cancelar"
                        type="button"
                        className="button-cancel-text large hover-three disabled-black"
                        action={() => CancelFunction()}                    
                    />
                    <ButtonComponent
                        form="createMasterForm"
                        value="Guardar"
                        type="submit"
                        className="button-save large disabled-black"                    
                    />
                </div>                
            </div>
        </Fragment>
    )
}


export default React.memo(MasterCrudPage);
