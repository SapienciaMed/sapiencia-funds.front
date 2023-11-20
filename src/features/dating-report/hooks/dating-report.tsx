import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterBudget } from "../../../common/schemas/budget-schema";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableElement } from "../../../common/interfaces/table.interfaces";
import { ICallBudget } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import {jsDateToISODate,jsDateToSQLDate,} from "../../../common/utils/helpers";
import { urlApiFunds } from "../../../common/utils/base-url";
import axios from 'axios';
import { ApiResponse } from "../../../common/utils/api-response";
import useDatingApi from "./dating-api.hook";
import { ICallDating } from "../../../common/interfaces/dating.interface";


export default function useDatingSearch() {
    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterBudget);
    const navigate = useNavigate();
    const [announcementList, setAnnouncementList] = useState([]);
    const [programList, setProgramList] = useState([]);
 

   //peticiones api
   const { getProgramTypes, getAnnouncement } = useDatingApi();

    const tableComponentRef = useRef(null);
    
    const [showTable, setShowTable] = useState(false);

    const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
    const [formWatch, setFormWatch] = useState({id_comuna: "", periodo: "",});


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
    } = useForm<ICallDating>({ resolver }
    );

    const [contractCode, expeditionDate] = watch([,
        "contractCode",
        "expeditionDate",
    ]);


    useEffect(() => {
        getProgramTypes()
            .then((response) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setProgramList(
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
    }, []);


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

    const downloadCollection = useCallback(() => {
        const { page, perPage } = paginateData;
        const programa = watch('programa');
        const convocatoria = watch('convocatoria');
        const url = new URL(`${urlApiFunds}/api/v1/citas/generate-xlsx`);
        const params = new URLSearchParams();
        params.append("page", page + 1)
        params.append("perPage", perPage + 10)

        if (Array.isArray(programa) && programa.length > 0) {
            params.append("programa", programa.join(','));
        } else if (typeof programa === 'number') {
            params.append("programa", String(programa));
        }
        
        if (convocatoria) {
            params.append("convocatoria", String(convocatoria));
        }

        url.search = params.toString();
        window.open(url.toString(), "_blank");
        setMessage({
            title: "Descargar",
            description: "Información descargada exitosamente",
            show: true,
            background: true,
            OkTitle: "Cerrar"
          });

    }, [paginateData, formWatch,]

    );



    return {
        announcementList,
        programList,
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
