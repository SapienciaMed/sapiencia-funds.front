import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { renewalSchma } from "../../../common/schemas/renewal-shema";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ICallRenewal, IRenewalDataGrid } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import useRenewalReportApi from "./renewal-report-api.hook";

import * as XLSX from "xlsx"


export default function useRenewaReportSearch() {
    const { setMessage, setdataGridRenewal, dataGridRenewal } = useContext(AppContext);
    const resolver = useYupValidationResolver(renewalSchma);
    const navigate = useNavigate();


    //peticiones api
    const { getAnnouncement, getRenewalReport, createRenewal, report, calculate,getBeca,createReportRenewal } = useRenewalReportApi();
    const tableComponentRef = useRef(null);
    const [showTable, setShowTable] = useState(false);
    const [announcementList, setAnnouncementList] = useState([]);

    const [enabledBachLeg, setenabledBachLeg] = useState("0");
    const [renewedBachLeg, setrenewedBachLeg] = useState("0");
    const [percentageBachLeg, setPercentageBachLeg] = useState("0.00%");
    const [inputEnabledBachLeg, setInputEnabledBachLeg] = useState("0");
    const [dataReports, setDataReports] = useState([]);
    const [totalEnabled, setTotalEnabled] = useState(0);
    const [totalRenewed, setTotalRenewed] = useState(0);
    const [totalRenewedBeca, setTotalRenewedBeca] = useState(0);
    const [porcentageProm, setPorcentageProm] = useState("0.00%");
    const [porcentageLegal, setPorcentageLegal] = useState("0.00%");




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
        const updatedDataGrid = dataGridRenewal.map(row => {
            if (row.fund === updatedRenewal.fund) {
                return {
                    ...row,
                    enabled: updatedRenewal.enabled,
                    percentage: calculatePercentage(row.renewed, updatedRenewal.enabled),
                };
            }
            return row;
        });

        setdataGridRenewal(updatedDataGrid);
    };
    // searchRenewal
    const selectedperiodo = watch('period');
    const habilitados = watch('enabledBachLeg')

    

    const searchRenewal = handleSubmit(async (data: ICallRenewal) => {
        setShowTable(true)
        loadTableData({
            period: selectedperiodo,
        })
        dataReport({
            period: selectedperiodo
        })

        getBecas()


    });



    const dataReport = async (data: ICallRenewal) => {
        try {
            const response = await calculate(String(selectedperiodo));

            setTotalEnabled(response.data.sumEnabled)
            setTotalRenewed(response.data.sumRenewed)

        } catch (error) {
            console.error(error);
        }
    };

    const getBecas = async () => {
        try {
            const response = await getBeca(String(selectedperiodo));           

            setTotalRenewedBeca(response.data[0].renewed)        

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const data = {
            period: selectedperiodo
        }

        getRenewalReport(data)
            .then((response) => {                
                if (response && response?.operation?.code === EResponseCodes.OK) {
                   setDataReports(response.data.array)
                }
            })
    }, [selectedperiodo]);


    useEffect(() => {
        setPorcentageProm(totalEnabled > 0 ? (totalRenewed*100/totalEnabled).toFixed(2) + "%" : "0.00%")
    }, [totalRenewed, totalEnabled])

    useEffect(() => {       
        setPorcentageLegal(habilitados > 0 ? (totalRenewedBeca*100/habilitados).toFixed(2) + "%" : "0.00%")
    }, [totalRenewedBeca, habilitados])


    function downloadCollection() {
        // Suponiendo que response es la respuesta de getRenewalReport
        const excelData = dataReports.map((row) => ({
            "Fondo": row.fund,
            "Nro. habilitados": row.enabled ?? "0", // Asegúrate de manejar valores nulos o indefinidos
            "Nro. Renovados": row.renewed ?? "0",
            "Porcentaje": row.percentage + "%" ?? "0.0",
        }));


        const book = XLSX.utils.book_new()
        const sheet = XLSX.utils.json_to_sheet(excelData)

        XLSX.utils.book_append_sheet(book, sheet, `Informe Renovación`)

        setTimeout(() => {
            XLSX.writeFile(book, `Informe Renovación.xlsx`)
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
        },)

    }


    //Consultar
    const onSubmit = handleSubmit(async (data: ICallRenewal) => {
        setShowTable(true)
        setdataGridRenewal
    });

    /*Functions*/
    const onsubmitCreate = handleSubmit((data: ICallRenewal) => {
        const datos = {            
            enabled: String(data.enabledBachLeg)           
        };
        
        const period = Number(selectedperiodo);

        setMessage({
            show: true,
            title: "Guardar cambios",
            description: "¿Estás segur@ de guardar la información?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                confirmRenewalCreation(period,datos)
            },
            onClose() {
                reset();
                setMessage({});
            },
            background: true,
        });
    });

    const confirmRenewalCreation = async (period:number,data: ICallRenewal) => {

        const res = await createReportRenewal(period,data);
        if (res && res?.operation?.code === EResponseCodes.OK) {
            setMessage({
                OkTitle: "Aceptar",
                description: "¡Guardado exitosamente!",
                title: "Guardar cambios",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                    reset();
                    setMessage({});
                    tableComponentRef.current.emptyData();
                    setShowTable(false)
                },
                onClose() {
                    reset();
                    setMessage({});
                },
            });

        } else {
            setMessage({
                type: EResponseCodes.FAIL,
                title: "Crear informe renovación",
                description: "Ocurrió un error en el sistema",
                show: true,
                OkTitle: "Aceptar",
                background: true,
            });

        } 

    };

    useEffect(() => {
        /*  if (selectedperiodo != null) {
           loadTableData({
             period: selectedperiodo,        
           })
         } */
    }, [selectedperiodo])

    function loadTableData(searchCriteria?: object): void {
        //setShowSpinner(false)
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }

        dataReport({
            period: selectedperiodo
        })
    }


    return {
        selectedperiodo,
        loadTableData,
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
        totalRenewed,
        porcentageProm,
        porcentageLegal,
        totalRenewedBeca
    }
}