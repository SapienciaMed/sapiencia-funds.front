import { useContext, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createVotings } from "../../../common/schemas/voting-schema";
import { IVotingCreate } from "../../../common/interfaces/voting.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useVotingService } from "../../../common/hooks/voting-service.hook";


export const useVotingResults = () => {

    const [sending, setSending] = useState(false);
    const { setMessage, authorization } = useContext(AppContext);
    const navigate = useNavigate();
    const resolver = useYupValidationResolver(createVotings);


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
        okTitle: "Aceptar",
        cancelTitle: "Cancelar",
        onOk() {
            navigate("/core/usuarios/consultar");
            setMessage((prev) => ({ ...prev, show: false }));
        },
        background: true,
        });
    };


    /*Functions*/
    const onSubmitSignIn = handleSubmit((data: IVotingCreate) => {    
        setMessage({
        show: true,
        title: "Crear usuario",
        description: "¿Estás segur@ de crear un nuevo usuario en el sistema?",
        okTitle: "Crear",
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
                okTitle: "Aceptar",
                description: "Se ha creado la votación en el sistema exitosamente",
                title: "Crear Votación",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                reset();
                setMessage({});
                navigate("/core/usuarios/consultar");
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
                okTitle: "Aceptar",
                background: true,
            });
            setSending(false);
        } 
    };


    return {
        CancelFunction,
        onSubmitSignIn,
        confirmVotingCreation,
        register,
        errors,
        sending
    }
};
