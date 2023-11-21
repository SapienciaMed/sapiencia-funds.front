import { useForm } from "react-hook-form";
import { IActa  } from "../../../common/interfaces";
import { useContext } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import ItemsCreatePage from "../pages/items-create.page";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { editActas } from "../../../common/schemas/acta-shema";

export default function useActaCrudEditTasa() {

    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(editActas);

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        formState: { errors: errosEdit },
        control: controlEdit,
        setValue,
        watch
    } = useForm<IActa>({
        resolver,
        mode: 'all'
    });

    const addItem = handleSubmitEdit(async (data: IActa) => {
        data.idStatus = 1;
        setMessage({
            show: true,
            title: "Agregar ítem",
            description: <ItemsCreatePage acta={data} action={"new"} />,
            background: true,
            size: "items",
            items: true,
            onOk() {
                setMessage({});
            },
        });
    })   
  
    return{
        errosEdit,
        controlEdit,
        registerEdit,
        handleSubmitEdit,
        addItem,
    }

}