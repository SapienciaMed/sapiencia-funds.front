
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../../common/components/Form";
import { useForm, Controller } from 'react-hook-form';
import { EDirection } from "../../../../common/constants/input.enum";
import { BiPlusCircle } from "react-icons/bi";
import {BsTrash } from "react-icons/bs";
import { useWidth } from "../../../../common/hooks/use-width";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { Dialog } from "primereact/dialog";
import UploadNewComponent from "../../../../common/components/Form/UploadNewComponent";
import { AppContext } from "../../../../common/contexts/app.context";
import { usePaccServices } from "../../hook/pacc-serviceshook";
import { useParams } from "react-router";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { manageTransfer } from "../../../../common/schemas/acta-shema";

interface IPropManageTransfer {
    idSelect: number
}

function ManageTransfer({ idSelect }: IPropManageTransfer ){

    const { id } =  useParams()
    const [seeObservation, setSeeObservation ] = useState(false)
    const [visible, setVisible] = useState<boolean>(false);
    const [filesUploadData, setFilesUploadData] = useState<File>(null);
    const { setMessage, authorization } = useContext(AppContext);
    const [messageError, setMessageError] = useState({})
    const { ChangeApproveOrRejectKnowledgeTransfer } = usePaccServices()
    const resolver = useYupValidationResolver(manageTransfer);
    const {
        handleSubmit,
        register, 
        formState: { errors },
        watch,
        control,
        resetField,
        unregister
    } = useForm({resolver})
    const {width} = useWidth()

    const watchState = watch('state')

    useEffect(() => {
        if(watchState === 'false'){
            setSeeObservation(true)
        }else {
            setSeeObservation(false)
            resetField('observation',{ defaultValue: '' })
            unregister('observation')
        }
        
    },[watchState])

    useEffect(() => {
        return () => {
            setFilesUploadData(null)     
        }
    },[])

    const onSubmit = handleSubmit((data: any) => {
        
        if(data.observation == '' || data.observationFile == ''){
            setMessageError({
                ...(data.observation ? {} : {
                    "observation": {
                        "type": "optionality",
                        "message": "Completar información"
                    }
                }),
                ...(data.observationFile ? {} : {
                    "observationFile": {
                        "type": "optionality",
                        "message": "Completar información"
                    }
                })  
                
            })
        }else{
            setMessageError({})
            console.log("🚀 ~ file: manage-transfer.tsx:59 ~ onSubmit ~ data:", data)
            const dataChange = {
                idBeneficiary: idSelect,
                status: watchState || '',
                observation: data.observation || 'Ninguna',
                user: authorization.user.numberDocument,
                workedHours: data.workedHours
            }
            console.log("🚀 ~ file: manage-transfer.tsx:85 ~ onSubmit ~ dataChange:", dataChange)
            
        }
    })

    return(
        <>
        <Dialog
            header="Si tienes más de un documento, se deben unir en un solo archivo para ser cargados"
            className="text-center div-modal movil"
            visible={visible}
            onHide={() => setVisible(false)}
            pt={{
            root: { style: { width: "35em" } },
            }}
        >
            <UploadNewComponent
                id='cargarArchivo'
                dataArchivo={(files: File) => {
                    if (files && files.name) { 
                        setFilesUploadData(files)
                        setVisible(false)
                    }
                }}
                showModal={(e: boolean) => { setVisible(e) }}
                titleFilesAccept="Solo es permitido el formato PDF"
                filesAccept="application/pdf"
            />
            <div className="modal-footer" style={{margin: '1rem'}}>
                <ButtonComponent
                    value='Cancelar'
                    className='button-ok small'
                    type='button'
                    action={() => { 
                        setVisible(false)
                        setFilesUploadData(null)
                    }}
                />
            </div>
        </Dialog>
        <div className="card-table gap-0 full-width">
            <FormComponent id="formManageTransfer" action={onSubmit}>
                <div className="grid-form-2-container ">
                    <SelectComponent
                        idInput={"state"}
                        control={control}
                        errors={errors}
                        data={[
                            { name: "Aprobado", value: "true" },
                            { name: "Rechazado", value: "false" },
                        ]}
                        label="Estado"
                        className="select-basic medium select-disabled-list"
                        classNameLabel="text-black biggest"
                        filter={true}
                        placeholder="Seleccionar."
                    />
                    <Controller
                            control={control}
                            name={"workedHours"}
                            defaultValue='' 
                            render={({ field }) => {
                                return(
                                    <InputComponent
                                        id={field.name}
                                        idInput={field.name}
                                        className="input-basic medium"
                                        typeInput="number"
                                        register={register}
                                        label="Horas realizadas"
                                        classNameLabel="text-black biggest"
                                        direction={EDirection.column}
                                        onChange={(value) => { field.onChange(value) }}
                                        errors={errors}
                                        max={200}
                                    />
                                )
                            }}
                        />
                </div>
                {
                    seeObservation && 
                        <div className='mt-24px'>
                            <Controller
                                control={control}
                                name={"observation"}
                                defaultValue=""
                                render={({ field }) => {
                                    return (
                                        <TextAreaComponent
                                            id={field.name}
                                            idInput={field.name}
                                            value={`${field.value}`}
                                            label="Observación"
                                            className="text-area-basic"
                                            classNameLabel="text-black biggest text-required"
                                            rows={2}
                                            placeholder="Escribe aquí"
                                            register={register}
                                            onChange={field.onChange}
                                            errors={messageError}
                                            characters={150}
                                        />
                                    );
                                }}
                            />
                        </div>
                    
                }
                {
                    !filesUploadData ? 
                        <div className='title-area-3 mt-14px'>
                            <div  className={`title-button ${width < 300 ? 'font-medium' :'font-big' } no-margin`}
                                onClick={() => {
                                    setVisible(true);
                                }}
                            >
                                Adjuntar archivos  <BiPlusCircle />
                            </div>

                        </div>
                    : 
                    <>
                        <div className='title-area-3 mt-14px'>
                            <div  className={`title-button color-red ${width < 300 ? 'font-medium' :'font-big' } no-margin spc-common-table`} style={{justifyContent: 'center'}}
                                onClick={() => {
                                    setFilesUploadData(null)
                                    unregister('observationFile')
                                }}
                            >
                                {filesUploadData.name} <BsTrash className="button grid-button button-delete"/>
                            </div>


                        </div>
                            <div className=''>
                            <Controller
                                control={control}
                                name={"observationFile"}
                                defaultValue=""
                                render={({ field }) => {
                                    return (
                                        <TextAreaComponent
                                            id={field.name}
                                            idInput={field.name}
                                            value={`${field.value}`}
                                            label="Observación"
                                            className="text-area-basic"
                                            classNameLabel="text-black biggest text-required"
                                            rows={2}
                                            placeholder="Escribe aquí"
                                            register={register}
                                            onChange={field.onChange}
                                            errors={messageError}
                                            characters={150}
                                        />
                                    );
                                }}
                            />
                        </div>
                    
                    </>

                }


            </FormComponent>
        </div>
        <div className="funcionality-buttons-container2">
            <ButtonComponent
                value="Cancelar"
                type="button"
                className="button-clean-fields bold"
                action={() => {
                    setMessage({})
                }}
            />
            <ButtonComponent
                form="formManageTransfer"
                className="button-main huge hover-three"
                value="Aceptar"
                type="submit"
            />
        </div>   
        
        </>
    )
}

export default React.memo(ManageTransfer);
