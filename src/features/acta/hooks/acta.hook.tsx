import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from 'react-hook-form';
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchActas } from "../../../common/schemas/acta-shema";
import { IActaSearch } from "../interface/Acta";
import { useEffect, useState } from "react";

export function useActaData() {
    
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
        setValue
    } = useForm<IActaSearch>({
        resolver,
        mode: 'onChange'
    })

    const inputValue =  watch('id')

    useEffect(() => {
        // setIsBtnDisable(inputValue.some(value => value != '' && value != undefined))
        console.log("entro");
        
    },[inputValue])

    const onSubmit = handleSubmit(async (data: IActaSearch) => {
        console.log("🚀 ~ file: acta.hook.tsx:22 ~ onSubmit ~ data:", data)  
    })

    return{
        navigate,
        register,
        onSubmit,
        reset,
        errors,
        isBtnDisable,
        control
    }
}