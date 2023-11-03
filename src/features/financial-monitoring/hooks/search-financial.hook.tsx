import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterBudget } from "../../../common/schemas/budget-schema";
import { RiFileExcel2Line } from "react-icons/ri";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
//import useBudgetApi from "./budget-api.hook";
import { ICallBudget } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";


export default function useFinancialSearch() {
    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterBudget);
    const navigate = useNavigate();
    const [announcementList, setAnnouncementList] = useState([]);
    const [budgetList, setbudgetList] = useState([]);

    //peticiones api
    //const { getAnnouncement, getbudget, downloadCallBudget } = useBudgetApi();

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
    } = useForm<ICallBudget>(
        { resolver }
    );


    // getbudget()
    // .then((response) => {
    //     if (response && response?.operation?.code === EResponseCodes.OK) {
    //         setbudgetList(
    //             response.data.map((item) => {
    //                 const list = {
    //                     name: item.id_comuna,
    //                     value: item.id_comuna,
    //                 };
    //                 return list;
    //             })
    //         );
    //     }
    // })

    // getAnnouncement()
    // .then((response) => {
    //     if (response && response?.operation?.code === EResponseCodes.OK) {
    //         setAnnouncementList(
    //             response.data.map((item) => {
    //                 const list = {
    //                     name: item.name,
    //                     value: item.id,
    //                 };
    //                 return list;
    //             })
    //         );
    //     }
    // })



    const tableColumns: ITableElement<ICallBudget>[] = [
        {
            fieldName: "announcementList",
            header: "Fondo comuna",
            renderCell: (row) => {
                return <>{row.id_comuna}</>;
            },
        },
        {
            fieldName: "name",
            header: "Presupuesto fondo comuna",
            renderCell: (row) => {
                return <>{row.presupuesto_comuna}</>;
            },
        },       
        {
            fieldName: "name",
            header: "Recurso otorgado de legalizacion",
            renderCell: (row) => {
                return <>{row.legaliza_comuna}</>;
            },
        },
        {
            fieldName: "name",
            header: "Restante",
            renderCell: (row) => {
                return <>{row.restante_presupuesto}</>;
            },
        },
        {
            fieldName: "name",
            header: "Usuarios por comuna",
            renderCell: (row) => {
                return <>{row.usuarios_comuna}</>;
            },
        },            
    ];

    // const tableActions: ITableAction<ICallBudget>[] = [
    //     {
    //         onClick: (row) => {
    //             downloadCallBudget(row.id_comuna)
                  
    //                   const buffer = new Uint8Array(row.id_comuna); // Convierte el Array del búfer en Uint8Array
    //                   const blob = new Blob([buffer]);
    //                   const url = window.URL.createObjectURL(blob);
    //                   const a = document.createElement("a");
    //                   a.href = url;
    //                   a.download = `${row.id_comuna}.xlsx`;
    //                   document.body.appendChild(a);
    //                   a.click();
    //                   window.URL.revokeObjectURL(url);
    //                   setMessage({
    //                     title: `Descargar excel`,
    //                     description: `El archivo fue descargado con éxito`,
    //                     show: true,
    //                     OkTitle: "Aceptar",
    //                     background: true,
    //                   });
                    
    //           },
    //         customIcon: () => {
    //             return <RiFileExcel2Line color="#21A366" />;
    //         },
          
    //     },
    // ];
   

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

    const clearFields = () => {
        reset();
        tableComponentRef.current?.emptyData();
        setShowTable(false);
      };


    const onSubmit = handleSubmit(async (data: ICallBudget) => {        
        setShowTable(true)

        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(data);
        }
    });

    return {
        announcementList,
        budgetList,
        control,
        errors,
        register,
        setValue,
        navigate,       
        setShowTable,
        showTable,
        tableColumns,
        //tableActions,
        tableComponentRef,
        onSubmit,
        reset,
        clearFields,
      }

}
