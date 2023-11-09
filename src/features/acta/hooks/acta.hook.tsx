import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchActas } from "../../../common/schemas/acta-shema";
import { IActaSearch } from "../interface/Acta";
import { useEffect, useState } from "react";

export default function useActaData() {
    
    const navigate = useNavigate();
    const resolver = useYupValidationResolver(searchActas);
    const [ isBtnDisable, setIsBtnDisable ] = useState<boolean>(false)

    const {
        handleSubmit,
        register, 
        formState: { errors },
        reset,
        watch,
        control,
    } = useForm<IActaSearch>({
        resolver,
        mode: 'all'
    })

    const inputValue =  watch(['actaNro'])

    useEffect(() => {
        setIsBtnDisable(inputValue.some(value => value != '' && value != undefined))
    },[inputValue])

    const onSubmitSearch = handleSubmit((data: IActaSearch) => {
        console.log("🚀 ~ file: acta.hook.tsx:22 ~ onSubmit ~ data:", data)  
        navigate('../visualizar')
    })

    const onAddvalues = async (data) => {
        // navigate('./modificar-acta')
        console.log("Crear la vista de modificar");  
    };
    
    const handleModifyActa = () => handleSubmit(onAddvalues)();

    return{
        navigate,
        register,
        onSubmitSearch,
        handleModifyActa,
        reset,
        errors,
        isBtnDisable,
        control
    }
}