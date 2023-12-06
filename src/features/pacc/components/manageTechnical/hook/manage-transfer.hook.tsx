import { useContext, useEffect, useState } from "react";
import { IChageStatusKnowledgeTransfer, IPropManageTransfer, IRequerimentsResultSimple } from "../interface/manage-technical";
import { AppContext } from "../../../../../common/contexts/app.context";
import { usePaccServices } from "../../../hook/pacc-serviceshook";
import useYupValidationResolver from "../../../../../common/hooks/form-validator.hook";
import { manageTransfer } from "../../../../../common/schemas/acta-shema";
import { useForm } from "react-hook-form";
import { EResponseCodes } from "../../../../../common/constants/api.enum";
import { uploadFileManageTranfer } from "../helper/uploadFileManageTransfer";

export default function useManageTransfer({ idSelect, loadTableData, idBeneficiary, getUploadKnow }: IPropManageTransfer) {
    
    const [seeObservation, setSeeObservation ] = useState(false)
    const [visible, setVisible] = useState<boolean>(false);
    const [filesUploadData, setFilesUploadData] = useState<File>(null);
    const { setMessage, authorization } = useContext(AppContext);
    const [messageError, setMessageError] = useState({})
    const [ requirements, setRequirements ] = useState<IRequerimentsResultSimple[]>([])
    const { ChangeApproveOrRejectKnowledgeTransfer, GetRequirementsKnowledgeTransfer } = usePaccServices()
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
        GetRequirementsKnowledgeTransfer(idBeneficiary).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                setRequirements(response.data)
            }
        })
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
            const dataChange: IChageStatusKnowledgeTransfer = {
                id: idSelect,
                idBeneficiary: idBeneficiary,
                status: watchState == 'true' ? true : false,
                observations: data.observation || 'Ninguna',
                user: authorization.user.numberDocument,
                workedHours: parseInt(data.workedHours)
            }
            const showMessage = false
            const url = `/consolidation-tray/upload-knowledge-transfer-file/${idSelect}/${String(idBeneficiary)}`

            setMessage({
                title: "Transferencia de conocimiento",
                description: '¿Estas segur@ de guardar la información de transferencia de conocimiento?',
                show: true,
                OkTitle: "Aceptar",
                cancelTitle: "Cancelar",
                onOk: () => {
                    ChangeApproveOrRejectKnowledgeTransfer(dataChange).then(response => {
                        if(response.operation.code === EResponseCodes.OK){
                            filesUploadData && uploadFileManageTranfer([filesUploadData], setMessage, authorization, url, showMessage,) // para  subir archivo
                            setMessage({
                                title: "Guardar",
                                description: `¡Cambios guardados exitosamente!`,
                                show: true,
                                OkTitle: "Aceptar",
                                onOk: () => {
                                    setMessage((prev) => {
                                        return { ...prev, show: false };
                                    });
                                    loadTableData()
                                    getUploadKnow()
                                    setFilesUploadData(null)   
                                },
                                onClose: () => {
                                    setMessage({});
                                    loadTableData()
                                    getUploadKnow()
                                    setFilesUploadData(null)   
                                },
                                background: true,
                              });
                            
                        }
                    })
                },
                onClose: () => {
                    setMessage({});
                    setFilesUploadData(null)   
                },
                onCancel: () => {
                    setMessage({});
                    setFilesUploadData(null)   
                },
                background: true,
              
            })

            

        }
    })

    return {
        onSubmit,
        register,
        errors,
        visible,
        setVisible,
        filesUploadData,
        setFilesUploadData,
        requirements,
        messageError,
        seeObservation,
        control,
        setMessage,
        unregister
    }
}