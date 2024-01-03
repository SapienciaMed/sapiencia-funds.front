import { useForm } from "react-hook-form";
import useRemnantsApi from './remnants-api.hook';
import { useContext, useEffect, useRef, useState } from "react";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ITableAction, ITableElement } from "../../../common/interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import EditItemsPage from "../pages/editItems.page";
import { formatNumberToTwoDecimals, formaterNumberToCurrency } from "../../../common/utils/helpers";

import * as XLSX from "xlsx"
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { remnantsFilter } from "../../../common/schemas/remnants-shema";
import { IRemnantsFilter } from "../../../common/interfaces/remnants.interface";
interface ReportData {
    announcement: number;
    fund: number;
    trust: number;
  }

export default function useRemnants() {

    //service
    const { getPeriod, getFund, getFiducia, deleteRemnant, getReport } = useRemnantsApi();

    //states
    const [announcementList, setAnnouncementList] = useState([]);
    const [fundList, setFundList] = useState([]);
    const [fiduciaList, setFiduciaList] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [reportData, setReportData] = useState<ReportData>({} as ReportData);
    const [showDownload, setShowDownload] = useState(false);

    const tableComponentRef = useRef(null);
    const { setMessage, validateActionAccess } = useContext(AppContext);


    const resolver = useYupValidationResolver(remnantsFilter);


    //form
    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<IRemnantsFilter>({resolver});



    //useEffects
    useEffect(() => {
        getPeriod().then((response) => {
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

        getFund().then((response) => {
            if (response && response?.operation?.code === EResponseCodes.OK) {
                setFundList(
                    response.data.map((item) => {
                        const list = {
                            name: item.name,
                            value: item.name,
                        };
                        return list;
                    })
                );
            }
        })

        getFiducia().then((response) => {
            if (response && response?.operation?.code === EResponseCodes.OK) {
                setFiduciaList(
                    response.data.map((item) => {
                        const list = {
                            name: item.contractNumber + " - " + item.fiduciaryIdentification,
                            value: item.id,
                        };
                        return list;
                    })
                );
            }
        })

    }, [])

    //manejo de tabla
    const tableColumns: ITableElement<any>[] = [
        {
            fieldName: "communityFund",
            header: "Contrato",
        },
        {
            fieldName: "communityFund",
            header: "N. Beneficios",
        },
        {
            fieldName: "remaining",
            header: "Valor inversión contrato",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(row.remaining)}</>;
            }
        },
        {
            fieldName: "averageCost",
            header: "Valor proyectado",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(row.averageCost)}</>;
            }
        },
        {
            fieldName: "quotas",
            header: "Valor comprometido Proyectado",
            renderCell: (row) => {
                return <>{formatNumberToTwoDecimals(row.quotas)}</>;
            }
        },
        {
            fieldName: "quotaResource",
            header: "Valor excedente",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(row.quotaResource)}</>;
            }
        },
        {
            fieldName: "residual",
            header: "Girado",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(row.residual)}</>;
            }
        }, 
        {
            fieldName: "residual",
            header: "Pendiente por girar comprometido",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(row.residual)}</>;
            }
        }, 
        {
            fieldName: "residual",
            header: "pendiente por girar proyectado",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(row.residual)}</>;
            }
        }, 
        {
            fieldName: "residual",
            header: "recursos sin ejecución",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(row.residual)}</>;
            }
        }, 
    ];

    const tableActions: ITableAction<any>[] = [
        {
            icon: "Edit",
            onClick: (row) => {

                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <EditItemsPage item={row} loadTableData={loadTableData} />,
                    background: true,
                    size: "items",
                    items: true,
                    onOk() {
                        setMessage({});
                    },
                });
            },
            hide: !validateActionAccess("EXCEDENTE_CONTRATOS_EDITAR"),
        },
       /*  {
            icon: "Delete",
            onClick: (row) => {

                setMessage({
                    show: true,
                    title: "Eliminar",
                    description: "¿Estas segur@ de eliminar el registro?",
                    OkTitle: "Aceptar",
                    cancelTitle: "Cancelar",
                    onOk() {
                        confirmDelete(row);
                    },
                    background: true,
                });
            },
        }, */
    ];


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
            setShowTable(false);
        }
    }, []);

    const onSubmit = handleSubmit(async (data: { announcement: number, fund: number, trust: number }) => {

        const searchData = {
            ...data           
        };
        setShowTable(true)
        loadTableData(searchData);
        setReportData(data)


        const res = await getReport({
            ...data  
        });
    
        // Validar si res.data.array contiene datos
        if (res.data && res.data.array && res.data.array.length > 0) {
            setShowDownload(true);  // Mostrar la opción de descarga solo si hay datos
        } else {
            setShowDownload(false); // Ocultar la opción de descarga si no hay datos
        }
    });

 
    

    //Eliminar    
    const confirmDelete = async (row) => {       

        const res = await deleteRemnant(row.id);
        
        if (res && res?.operation?.code === EResponseCodes.OK) {
            setMessage({
                OkTitle: "Cerrar",
                description: "Eliminado exitosamente",
                title: "Eliminar",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                    reset();
                    setMessage({});
                     loadTableData({
                        announcement: row.announcement,
                        fund: row.communityFund,
                        trust: row.trust
                    }) 
                    setReportData( {
                        announcement: row.announcement,
                        fund: row.communityFund,
                        trust: row.trust
                    })                    
                },
                onClose() {
                    reset();
                    setMessage({});
                },
            });
        } else {
            setMessage({
                type: EResponseCodes.FAIL,
                title: "Validación de datos",
                description: "¡El dato no existe!",
                show: true,
                OkTitle: "Aceptar",
                background: true,
            });
        }
    };

   
  
    
    
    async function downloadCollection() { 

        const selected = watch('announcement');
    
        const selectedAnnouncement = announcementList.find(item => item.value === selected);        
        
        const selectedName = selectedAnnouncement ? selectedAnnouncement.name : '0000';        


        const res = await getReport({
            announcement: reportData.announcement,
            fund: reportData.fund,
            trust: reportData.trust
        });
 
        if (res && res?.operation?.code === EResponseCodes.OK) {
            // Genera el excel con los datos de la respuesta
            const excelData = res.data.array.map((row) => ({
                "ID comuna": row.communityFund,
                "Restante": row.remaining ?? "0", 
                "ID fondo": row.communityFund,
                "Costo promedio": row.averageCost ?? "0",
                "Cupos": row.quotas ?? "0",
                "Recurso con cupos": row.quotaResource ?? "0",
                "Residual": row.residual ?? "0",
            }));

            const book = XLSX.utils.book_new();
            const sheet = XLSX.utils.json_to_sheet(excelData);
            XLSX.utils.book_append_sheet(book, sheet, `Remanente`);

            // Descarga el archivo
            setTimeout(() => {
                XLSX.writeFile(book, `Remanente ${selectedName}.xlsx`);
                setMessage({
                    title: "Descargar",
                    description: "Información descargada exitosamente",
                    OkTitle: "Cerrar",
                    show: true,
                    type: EResponseCodes.OK,
                    background: true,
                    onOk() {
                        setMessage({});
                        //navigate(-1);
                    },
                    onClose() {
                        setMessage({});
                        //navigate(-1);
                    },
                });
            },);
        }       

    }



    return {
        control,
        errors,
        register,
        announcementList,
        fundList,
        fiduciaList,
        onSubmit,
        tableComponentRef,
        tableColumns,
        tableActions,
        showTable,
        downloadCollection,
        showDownload,
        setShowTable,
        reset,
        setShowDownload
    }
}
