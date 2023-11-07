import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterBudget } from "../../../common/schemas/budget-schema";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableElement } from "../../../common/interfaces/table.interfaces";
import useBudgetApi from "./budget-api.hook";
import { ICallBudget } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import {jsDateToISODate,jsDateToSQLDate,} from "../../../common/utils/helpers";
import { urlApiFunds } from "../../../common/utils/base-url";
import axios from 'axios';
import { ApiResponse } from "../../../common/utils/api-response";


export default function useBudgetSearch() {
    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterBudget);
    const navigate = useNavigate();
    const [announcementList, setAnnouncementList] = useState([]);
    const [budgetList, setbudgetList] = useState([]);

    //peticiones api
    const { getAnnouncement, getbudget, downloadCallBudget } = useBudgetApi();

    const tableComponentRef = useRef(null);
    
    const [typeMasterList, setTypeMasterList] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
    const [formWatch, setFormWatch] = useState({id_comuna: "", periodo: "",});
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [filesUploadData, setFilesUploadData] = useState<File[]>([]);

    const { authorization } = useContext(AppContext)
    console.log(authorization.user.id)

    const {
        handleSubmit,
        register,  
        setValue,
        reset,
        watch,
        control: control,
        formState: { errors },
    } = useForm<ICallBudget>({ resolver }
    );

    const [contractCode, expeditionDate] = watch([,
        "contractCode",
        "expeditionDate",
    ]);


    getbudget()
    .then((response) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
            setbudgetList(
                response.data.map((item) => {
                    const list = {
                        name: item.id_comuna,
                        value: item.id_comuna,
                    };
                    return list;
                })
            );
        }
    })
    

    getAnnouncement()
    .then((response) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
            setAnnouncementList(
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
        {
            fieldName: "name",
            header: "Total proyectado",
            renderCell: (row) => {
                return <>{}</>;
            },
        },   
        {
            fieldName: "name",
            header: "Diferencia por comprometer",
            renderCell: (row) => {
                return <>{}</>;
            },
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


    const postRequest   = async (url: any, data: any) => {
        try {
          const response = await axios.post(url, data, {
            responseType: 'blob', // Especifica que esperas una respuesta de tipo archivo.
          });
          // Verifica si la respuesta es un archivo descargable.
          if (response.headers['content-type'].includes('application/octet-stream')) {
            // Crea una URL para el archivo y abre una nueva ventana para la descarga.
            const blob = new Blob([response.data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cuentas_cobro.xlsx'; // Nombre del archivo
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          }
        } catch (error) {
          console.error('Error al realizar la solicitud POST', error);
        }
      };

      const downloadCollection = useCallback(() => {
        const { page, perPage } = paginateData;
        const { id_comuna, periodo } = formWatch;
        const url = `${urlApiFunds}/api/v1/presupuesto/generate-xlsx`;
        const data = {
          page: page + 1,
          perPage: perPage + 10,
          id_comuna: 4123,
          periodo: 10,
        };
      
        postRequest(url, data);
      }, [paginateData, formWatch]);


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
        tableComponentRef,
        onSubmit,
        reset,
        clearFields,
        downloadCollection,
      }

}
