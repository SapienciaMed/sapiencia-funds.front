import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { ICitation } from "../../../common/interfaces/citationInterface";
import { useForm } from 'react-hook-form';
import useActaApi from "./acta-api.hook";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IUser } from "../../../common/interfaces/auth.interfaces";



export default function useCitacion() {

    const { setMessage, authorization, setDataGridItems, dataGridItems } = useContext(AppContext);

    const { getProjectsList, createActa, getHours } = useActaApi();
    const { getUser } = useAuthService();


    const [userInfo, setUserInfo] = useState([]);
    const [activeUserList, setActiveUserList] = useState([]);
    const [times, setTimes] = useState([]);


    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<ICitation>({});


    const getWorkersActive = () => {
        getUser()
            .then((response: ApiResponse<IUser[]>) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setUserInfo(response.data);
                    setActiveUserList(
                        response.data.map((item) => {
                            const list = {
                                value: item.id,
                                name: `${item.numberDocument +
                                    " - " +
                                    item.names +
                                    " " +
                                    item.lastNames
                                    }`,
                                email: item.email
                            };
                            return list;
                        })
                    );
                }
            })
            .catch((err) => { });
    };


    useEffect(() => {      
        getWorkersActive();
        getHours().then(result => setTimes(result));

        const selectedUser = watch('user');
        console.log(selectedUser)
    }, []);









    const onsubmitCreateCitacion = handleSubmit((data: ICitation) => {
        setMessage({
            show: true,
            title: "Guardar acta",
            description: "¿Estas segur@ de guardar de guardar la información?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                //confirmActaCreation(data);
            },
            background: true,
        });
    });

    return {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
        watch,
        errors,
        onsubmitCreateCitacion,
        activeUserList
    }

}
