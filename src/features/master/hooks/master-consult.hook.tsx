import { useForm } from "react-hook-form";
import { IMaster } from "../../../common/interfaces/master.interface";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterMaster } from "../../../common/schemas/masters-schema";
import { useContext, useEffect, useRef, useState } from "react";
import useMasterApi from "./master-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { AppContext } from "../../../common/contexts/app.context";


export default function useMasterConsult() {
    const { validateActionAccess } = useContext(AppContext);
    const { TypeMasterList } = useMasterApi();
    const resolver = useYupValidationResolver(filterMaster);
    const navigate = useNavigate();

    const tableComponentRef = useRef(null);
    
    const [typeMasterList, setTypeMasterList] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const {
        handleSubmit,
        register,  
        setValue,
        reset,
        control: control,
        formState: { errors },
    } = useForm<IMaster>({ resolver });


    useEffect(() => {
        TypeMasterList()
            .then((response) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setTypeMasterList(
                        response.data.map((item) => {
                            const list = {
                                name: item.name,
                                value: item.id,
                            };
                            return list;
                        })
                    );
                }
            })
    }, []);

    const tableColumns: ITableElement<IMaster>[] = [
        {
            fieldName: "typeMasterList.name",
            header: "Tipo maestro",
        },
        {
            fieldName: "name",
            header: "Maestro"
        },       
        {
            fieldName: "description",
            header:  "Descripción" ,                      
        }
    ];

    const tableActions: ITableAction<IMaster>[] = [
        {
            icon: "Detail",
            onClick: (row) => {},
        },
        {
            icon: "Edit",
            onClick: (row) => {                
                navigate(`./edit/${row.id}`);
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
            setShowTable(false);
        }
    }, []); 


    const onSubmit = handleSubmit(async (data: {codtlmo: string}) => {        
        const searchData = {
            ...data,             
        };
        setShowTable(true)
        loadTableData(searchData);
    });

    return {
        typeMasterList,
        control,
        errors,
        register,
        setValue,
        navigate,       
        setShowTable,
        showTable,
        tableColumns,
        tableActions,
        tableComponentRef,
        onSubmit,
        reset
      }

}