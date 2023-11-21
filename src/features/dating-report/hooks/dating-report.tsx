import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterBudget } from "../../../common/schemas/budget-schema";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableElement } from "../../../common/interfaces/table.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import {jsDateToISODate,jsDateToSQLDate,} from "../../../common/utils/helpers";
import { urlApiFunds } from "../../../common/utils/base-url";
import axios from 'axios';
import { ApiResponse } from "../../../common/utils/api-response";
import useDatingApi from "./dating-api.hook";
import { ICallDating } from "../../../common/interfaces/dating.interface";
import { filterDating } from "../../../common/schemas/dating-shema";


export default function useDatingSearch() {
    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterDating);
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
    } = useForm<ICallDating>({resolver}
    );

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


    const tableColumns: ITableElement<ICallDating>[] = [
        {
            fieldName: "usuario",
            header: "Usuario",
            renderCell: (row) => {
                return <>{row.id_usuario}</>;
            },
        },
        {
            fieldName: "taquilla",
            header: "Taquilla",
            renderCell: (row) => {
                return <>{row.taquilla}</>;
            },
        },       
        {
            fieldName: "fecha",
            header: "Fecha",
            renderCell: (row) => {
                return <>{row.fecha}</>;
            },
        },
        {
            fieldName: "hora_inicio",
            header: "Hora inicio",
            renderCell: (row) => {
                return <>{row.hora_inicio}</>;
            },
        },
        {
            fieldName: "estado",
            header: "Estado",
            renderCell: (row) => {
                return <>{row.estado}</>;
            },
        },
        {
            fieldName: "nombre",
            header: "Nombre",
            renderCell: (row) => {
                return <>{row.nombre}</>;
            },
        },   
        {
            fieldName: "Identificacion",
            header: "identificación",
            renderCell: (row) => {
                return <>{row.cedula}</>;
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

    const onSubmit = handleSubmit(async (data: ICallDating) => {        
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
        params.append("perPage", perPage + 10000)

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
