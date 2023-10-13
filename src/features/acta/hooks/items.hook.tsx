import { useEffect, useRef, useState } from "react";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IActaItems } from "../../../common/interfaces/actaItems.interface";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { createActas } from "../../../common/schemas/acta-shema";
import { useForm } from "react-hook-form";


export default function useActaItems() {
    const resolver = useYupValidationResolver(createActas);
    //const { setMessage, authorization } = useContext(AppContext);

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
      } = useForm<IActaItems>({ resolver });


      const onsubmitAddItem = handleSubmit((data: IActaItems) => {    
        console.log(data)
        setDatos([data])
        loadTableData([data])
      });


      const tableColumns: ITableElement<IActaItems>[] = [
        {
            fieldName: "program",
            header: "Tipo maestro",
        },
        {
            fieldName: "found",
            header: "Fondo"
        },       
        {
            fieldName: "line",
            header:  "Linea" ,                      
        }
    ];

    const tableActions: ITableAction<IActaItems>[] = [
        {
            icon: "Detail",
            onClick: (row) => {},
        },
        {
            icon: "Edit",
            onClick: (row) => {                
                //navigate(`./edit/${row.id}`);
            },
            //hide: !validateActionAccess('MAESTROS_CREAR')
            
        },
    ];

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    useEffect(() => {
        loadTableData()
    },[])

    useEffect(() => {            
        reset();
        if(showTable)  {
            tableComponentRef.current.emptyData();
            setShowTable(true);
        }
    }, []); 


    return {        
        control,
        errors,
        register,
        setValue,
        onsubmitAddItem,
        setShowTable,
        showTable,
        tableActions,
        tableColumns,
        tableComponentRef,
        datos
        /* CancelFunction  */
      } 
}