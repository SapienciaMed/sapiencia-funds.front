import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createItems } from "../../../common/schemas/voting-schema";
import { IVotingCreate } from "../../../common/interfaces/voting.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useVotingService } from "../../../common/hooks/voting-service.hook";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";



export const useItemResults = () => {

    const [sending, setSending] = useState(false);
    const { setMessage, authorization } = useContext(AppContext);
    // const navigate = useNavigate();
    const resolver = useYupValidationResolver(createItems);
    const { getListByParent } = useGenericListService();
    const [deparmetList, setDeparmentList] = useState([])


    const { createVoting } = useVotingService();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = useForm<IVotingCreate>({ resolver });
    
    const CancelFunction = () => {
        setMessage({
            show: true,
            title: "Cancelar",
            description: "¿Estás segur@ de cancelar esta acción en el sistema?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                setMessage((prev) => ({ ...prev, show: false }));
            },
            background: true,
        });
    };


    /*Functions*/
    const onSubmitCreateItem = handleSubmit((data: IVotingCreate) => {
        setMessage({
            show: true,
            title: "Crear usuario",
            description: "¿Estás segur@ de crear un nuevo usuario en el sistema?",
            OkTitle: "Crear",
            cancelTitle: "Cancelar",
            onOk() {
                confirmVotingCreation(data);
            },
            background: true,
        });
    });


    const confirmVotingCreation = async (data: IVotingCreate) => {
        
        setSending(true);

        const user = {
            communeNeighborhood: data.communeNeighborhood,
            numberProject: data.numberProject,
            validity: data.validity,
            ideaProject: data.ideaProject,
        };

        const res = await createVoting(user);

        if (res && res?.operation?.code === EResponseCodes.OK) {
            setMessage({
                OkTitle: "Aceptar",
                description: "Se ha creado la votación en el sistema exitosamente",
                title: "Crear Votación",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                    reset();
                    setMessage({});
                },
                onClose() {
                    reset();
                    setMessage({});
                },
            });
            setSending(false);
        } else {
            setMessage({
                type: EResponseCodes.FAIL,
                title: "Crear Votación",
                description: "Ocurrió un error en el sistema",
                show: true,
                OkTitle: "Aceptar",
                background: true,
            });
            setSending(false);
        }
    };

    useEffect(() => {
        getListByParent({ grouper: "DEPARTAMENTOS", parentItemCode: "COL" })
            .then((response: ApiResponse<IGenericList[]>) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setDeparmentList(
                        response.data.map((item) => {
                            const list = {
                                name: item.itemDescription,
                                value: item.itemCode,
                            };
                            return list;
                        })
                    );
                }
            })
    }, []);


    return {
        CancelFunction,
        onSubmitCreateItem,
        confirmVotingCreation,
        register,
        errors,
        sending,
        deparmetList
    }
};


