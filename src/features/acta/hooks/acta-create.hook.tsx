import { useForm } from "react-hook-form";
import { IActa } from "../../../common/interfaces/acta.interface";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createActas } from "../../../common/schemas/acta-shema";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import ItemsCreatePage from "../pages/items-create.page";
import { IActaItems } from "../../../common/interfaces/actaItems.interface";
import useActaApi from "./acta-api.hook";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList, ISalaryMin } from "../../../common/interfaces/global.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";


export default function useActaCreate() {
    const resolver = useYupValidationResolver(createActas);

    const { setMessage, authorization, setDataGridItems, dataGridItems } = useContext(AppContext);

    const tableComponentRef = useRef(null);

    const [showTable, setShowTable] = useState(false);
    const [datos, setDatos] = useState<IActaItems[]>([]);
    const [status, setStatus] = useState([]);
    const [salary, setSalary] = useState([]);
  

    const {  } = useActaApi();
    const { getSalaryMin } = useGenericListService();


    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IActa>({ resolver });

    


    const onsubmitItem = handleSubmit((data: IActa) => {
        //console.log('datos',data)
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
   
   useEffect(() => {
    getSalaryMin()
        .then((response) => {
            if (response && response?.operation?.code === EResponseCodes.OK) {
                setSalary(response.data[0].value);
            }
        })

    }, []);  
    

   
    
    useEffect(() => {
        if (!salary) return; 
        setValue("salaryMin", String(salary));
    }, [salary]);
    

    return {
        control,
        errors,
        register,
        setValue,
        onsubmitItem,        
        showTable, 
        tableComponentRef,
        datos,
        setDataGridItems, 
        dataGridItems,
        salary

        /* CancelFunction  */
    }
}