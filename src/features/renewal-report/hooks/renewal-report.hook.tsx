import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { renewalSchma } from "../../../common/schemas/renewal-shema";
import { RiFileExcel2Line } from "react-icons/ri";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { ICallRenewal, IRenewalDataGrid } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import useRenewalReportApi from "./renewal-report-api.hook";
import { data } from "../../socialization/service/api";
import { urlApiFunds } from "../../../common/utils/base-url";

import * as XLSX from "xlsx"


export default function useRenewaReportSearch() {
    const { setMessage, setdataGridRenewal, dataGridRenewal } = useContext(AppContext);
    const resolver = useYupValidationResolver(renewalSchma);
    const navigate = useNavigate();


    //peticiones api
    const { getAnnouncement, getRenewalReport } = useRenewalReportApi();
    const tableComponentRef = useRef(null);
    const [showTable, setShowTable] = useState(false);
    const [announcementList, setAnnouncementList] = useState([]);
    
    const [enabledTotal, setEnabledTotal] = useState(0);
    const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
    
    const [enabledBachLeg, setenabledBachLeg] = useState("0");
    const [renewedBachLeg, setrenewedBachLeg] = useState("0");
    const [percentageBachLeg, setPercentageBachLeg] = useState("0.00%");
    const [inputEnabledBachLeg, setInputEnabledBachLeg] = useState("0");
    const [datos, setDatos] = useState([]);
    
    const [datoss, setDatoss] = useState([]);



    const {
        handleSubmit,
        register,
        setValue,
        reset,
        control: control,
        formState: { errors },
        watch,
    } = useForm<ICallRenewal>(
        { resolver }
    );



    useEffect(() => {
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

    useEffect(() => {
        reset();
        if (showTable) {
            tableComponentRef.current.emptyData();
            setShowTable(true);
        }
    }, []);


    useEffect(() => {
        // Función para calcular el porcentaje
        const calculatePercentageBachLeg = (renewed: string, enabled: string | number) => {
            const parsedEnabled = parseFloat(String(enabled || 0));
            const parsedRenewed = parseFloat(renewed);

            return parsedEnabled !== 0 ? ((parsedRenewed / parsedEnabled)).toFixed(3) + "%" : "0.00%";
        };

        // Calcular Porcentaje para enabledBachLeg y al cambiar inputEnabledBachLeg
        const calculateAndSetPercentageBachLeg = () => {
            const parsedEnabledBachLeg = parseFloat(enabledBachLeg || "0");
            const parsedInputEnabledBachLeg = parseFloat(inputEnabledBachLeg || "0");
            const parsedRenewedBachLeg = parseFloat(renewedBachLeg || "0");

            // Calcular el porcentaje
            const percentageBachLeg = calculatePercentageBachLeg(renewedBachLeg, parsedEnabledBachLeg);

            // Actualizar el estado de percentageBachLeg
            setPercentageBachLeg(percentageBachLeg);
        };

        // Calcular Porcentaje al montar el componente
        calculateAndSetPercentageBachLeg();

        // Efecto para actualizar percentageBachLeg cuando cambia inputEnabledBachLeg o renewedBachLeg
        const updatePercentageBachLeg = () => {
            calculateAndSetPercentageBachLeg();
        };

        // Llama a la función de cálculo cuando inputEnabledBachLeg o renewedBachLeg cambian
        updatePercentageBachLeg();

    }, [enabledBachLeg, inputEnabledBachLeg, renewedBachLeg]);


    // Calcular Total habilitado
    const totalEnabled = dataGridRenewal.reduce((total, row) => {
        const enabled = parseFloat(row.enabled);
        return total + (isNaN(enabled) ? 0 : enabled);
    }, 0);

    // Calcular Total renovados
    const totalrenewed = dataGridRenewal.reduce((total, row) => {
        const renewed = parseFloat(row.renewed);
        return total + (isNaN(renewed) ? 0 : renewed);
    }, 0);

    // Calcular el porcentaje promedio
    const averagePercentage = totalEnabled > 0 ? (totalrenewed / totalEnabled).toFixed(3) + "%" : "0.00%";


    // Calcular Porcentaje
    const calculatePercentage = (renewed: string, enabled: string | number) => {
        const parsedRenewed = parseFloat(renewed);
        const parsedEnabled = parseFloat(String(enabled || 0));

        return parsedEnabled !== 0 ? ((parsedRenewed / parsedEnabled)).toFixed(3) + "%" : "0%";
    };

    // En useRenewaReportSearch
    const updateDataGridRenewal = (updatedRenewal: ICallRenewal) => {
        const updatedDataGrid = datos.map(row => {
            if (row.fund === updatedRenewal.fund) {
                return {
                    ...row,
                    enabled: updatedRenewal.enabled,
                    percentage: calculatePercentage(row.renewed, updatedRenewal.enabled),
                };
            }
            return row;
        });

        setDatos(updatedDataGrid);
        console.log('actulizado',updatedDataGrid)
    };
    // searchRenewal
    const searchRenewal = handleSubmit(async (data: ICallRenewal) => {
        const selectedperiodo = watch('period');
        data.period = selectedperiodo;
        data.page = 1;
        data.perPage = 10;
    
        const responservice: any = await getRenewalReport(data)
            .then(async (response) => {
                return response
            });
    
        // Crear un nuevo array con los datos procesados
        const newData = responservice.data.array.slice(0, -1).map(e => ({
            fund: e.fund,
            enabled: e.enabled,
            renewed: e.renewed,
            percentage: calculatePercentage(e.renewed, e.enabled),
        }));

        // Establecer el nuevo array como el estado actual
        
        setDatoss(newData);
       
        
        // Manejar la última fila (Beca mejores bachilleres legalizados)
        const lastRow = responservice.data.array.slice(-1)[0];
        setenabledBachLeg(lastRow.enabled);
        setrenewedBachLeg(lastRow.renewed);
        const percentageBachLeg = parseFloat(lastRow.enabled) !== 0
            ? ((parseFloat(lastRow.renewed) / parseFloat(lastRow.enabled)).toFixed(3) + "%")
            : "0.00%";
        setPercentageBachLeg(percentageBachLeg);
    });
    
    useEffect(()=>{
        setdataGridRenewal(datos);
    },datos)

    //console.log('datos grid',dataGridRenewal)

    useEffect(()=>{
        console.log(datoss)
        //setdataGridE([1,2,3,4])
    },[datoss])
    
    //console.log(dataGridE)

    //Consultar
    const onSubmit = handleSubmit(async (data: ICallRenewal) => {
        setShowTable(true)
        setdataGridRenewal
    });

    /*Functions*/
    const onsubmitCreate = handleSubmit((data: ICallRenewal) => {
        setMessage({
            show: true,
            title: "Guardar cambios",
            description: "Estás segur@ de guardar la información",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                confirmRenewalCreation(data)
            },
            onClose() {
                reset();
                setMessage({});
            },
            background: true,
        });
    });

    const confirmRenewalCreation = async (data: ICallRenewal) => {
        const renewalItems = dataGridRenewal.map((e) => ({
            fund: e.fund,
            enabled: e.enabled,
            renewed: e.renewed,
            percentage: e.percentage,
        }));

        // Convertir filas en columnas
        const transformedData = renewalItems.reduce((acc, item) => {
            Object.keys(item).forEach((key) => {
                acc[key] = acc[key] || [];
                acc[key].push(item[key]);
            });
            return acc;
        }, {});


        console.log("++++++++------transformedData", transformedData)
        handleModalSuccess();

    };

    `   const res = await createActa(renewalItems);

        if (res && res?.operation?.code === EResponseCodes.OK) {
            setMessage({
                OkTitle: "Guardar",
                description: "¡Guardado exitosamente!",
                title: "Guardar",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                    reset();
                    setMessage({});
                    navigate("/fondos/acta/consultar");
                    setDataGridItems([])
                    setDataGridUsers([])
                },
                onClose() {
                    reset();
                    setMessage({});
                },
            });

        } else {
            setMessage({
                type: EResponseCodes.FAIL,
                title: "Crear Acta",
                description: "Ocurrió un error en el sistema",
                show: true,
                OkTitle: "Aceptar",
                background: true,
            });

        }  `


    const handleModalError = (
        msg = `¡Ha ocurrido un error!`,
        navigateBoolean = true
    ) => {
        setMessage({
            title: "Error",
            description: msg,
            show: true,
            OkTitle: "cerrar",
            onOk: () => {
                if (navigateBoolean) {
                    navigate("../consultar");
                }
                setMessage((prev) => {
                    return { ...prev, show: false };
                });
            },
            onClose: () => {
                if (navigateBoolean) {
                    navigate("../consultar");
                }
                setMessage({});
            },
            background: true,
        });
    };

    const handleModalSuccess = () => {
        setMessage({
            title: "Cambios guardados",
            description: `¡Cambios guardados exitosamente!`,
            show: true,
            OkTitle: "Aceptar",
            onOk: () => {
                navigate("../consultar");
                setMessage((prev) => {
                    return { ...prev, show: false };
                });
            },
            onClose: () => {
                navigate("../consultar");
                setMessage({});
            },
            background: true,
        });
    };

    function downloadCollection() {

        let data = dataGridRenewal.map((d) => {
            return {
                "Fondo": d.fund,
                "Habilitados": d.enabled,
                "Renovados": d.renewed,
                "Porcentaje": d.percentage,
            }
        
        })

        const book = XLSX.utils.book_new()
        const sheet = XLSX.utils.json_to_sheet(data)

        XLSX.utils.book_append_sheet(book, sheet, `Informe Renovación`)

        setTimeout(() => {
            XLSX.writeFile(book, `Informe Renovación.xlsx`)
            setMessage({
                title: "Descargar",
                description: "Información descargada exitosamente ",
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
        },)

    }


    return {
        control,
        errors,
        register,
        setValue,
        navigate,
        setShowTable,
        showTable,
        tableComponentRef,
        onSubmit,
        reset,
        watch,
        announcementList,
        setdataGridRenewal,
        dataGridRenewal,
        searchRenewal,
        downloadCollection,
        updateDataGridRenewal,
        totalEnabled,
        totalrenewed,
        averagePercentage,
        enabledBachLeg,
        renewedBachLeg,
        percentageBachLeg,
        setInputEnabledBachLeg,
        inputEnabledBachLeg,
        onsubmitCreate,
        datos,
        datoss
       
    }
}