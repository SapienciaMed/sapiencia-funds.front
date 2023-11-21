import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchActas } from "../../../common/schemas/acta-shema";
import { IActaSearch } from "../interface/Acta";
import { useEffect, useState } from "react";
import useActaApi from "./acta-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";


export default function useActaData() {
    
    const navigate = useNavigate();
    const resolver = useYupValidationResolver(searchActas);
    const [ isBtnDisable, setIsBtnDisable ] = useState<boolean>(false)
    const { getLastId } = useActaApi();

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
        mode: 'all'
    })

    useEffect(() => {
        getLastId().then(response => {
            if (response.operation.code == EResponseCodes.OK) {
                const dinamicData = response?.data;
                setValue('actaNro', Object.values(dinamicData).find(us => us))
            }
        })
    },[])

    const inputValue =  watch(['actaNro'])

    useEffect(() => {
        setIsBtnDisable(inputValue.some(value => value != '' && value != undefined))
    },[inputValue])

    const onSubmitSearch = handleSubmit((data: IActaSearch) => {
        navigate(`../visualizar/${data.actaNro}`)
    })

    const onAddvalues = async (data: IActaSearch) => {
        navigate(`./modificar-acta/${data.actaNro}`) 
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
        control,
    }
}