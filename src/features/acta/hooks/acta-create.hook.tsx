import { useForm } from "react-hook-form";
import { IActa } from "../../../common/interfaces/acta.interface";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createActas } from "../../../common/schemas/acta-shema";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import ItemsCreatePage from "../pages/items-create.page";
import { IActaItems } from "../../../common/interfaces/actaItems.interface";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";



export default function useActaCreate() {
    const resolver = useYupValidationResolver(createActas);    

    const { setMessage, authorization, setDataGridItems, dataGridItems } =
    useContext(AppContext);

    const tableComponentRef = useRef(null);

    const [showTable, setShowTable] = useState(false);
    const [datos, setDatos] = useState<IActaItems[]>([]);




    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IActa>({ resolver });




    const onsubmitItem = handleSubmit((data: IActa) => {
        setMessage({
            show: true,
            title: "Agregar ítem",
            description: <ItemsCreatePage  acta={data} action={"new"}/>,
            background: true,
            size: "large",
            style: "mdl-agregarItem-voting"
        });
    });

    const onsubmitAddItem = handleSubmit((data: IActaItems[]) => {
        console.log("array", data);  // Verifica en la consola que data es un array
        setDatos(data);  // Asigna data directamente a setDatos
    });





    

   

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    useEffect(() => {
        loadTableData()
    }, [])

    useEffect(() => {
        reset();
        if (showTable) {
            tableComponentRef.current.emptyData();
            setShowTable(true);
        }
    }, []);













    return {
        control,
        errors,
        register,
        setValue,
        onsubmitItem,
        onsubmitAddItem,

        showTable, tableComponentRef, datos,
        setDataGridItems, dataGridItems

        /* CancelFunction  */
    }
}