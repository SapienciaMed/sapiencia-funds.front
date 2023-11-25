import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterBudget } from "../../../common/schemas/budget-schema";
import { RiFileExcel2Line } from "react-icons/ri";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { ICallRenewal, IRenewalDataGrid } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import useRenewalReportApi from "./renewal-report-api.hook";
import { data } from "../../socialization/service/api";
import { urlApiFunds } from "../../../common/utils/base-url";


export default function useRenewaReportSearch() {
    const { setMessage, setdataGridRenewal, dataGridRenewal } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterBudget);
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


    const {
        handleSubmit,
        register,
        setValue,
        reset,
        control: control,
        formState: { errors },
        watch,
    } = useForm<ICallRenewal>(
        {}
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
    const averagePercentage = totalEnabled > 0 ? (totalrenewed / totalEnabled * 100).toFixed(2) + "%" : "0.00%";
    

    // Calcular Porcentaje
    const calculatePercentage = (renewed: string, enabled: string | number) => {
        const parsedRenewed = parseFloat(renewed);
        const parsedEnabled = parseFloat(String(enabled || 0));
    
        return parsedEnabled !== 0 ? ((parsedRenewed / parsedEnabled) * 100).toFixed(2) + "%" : "0%";
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

    const searchRenewal = handleSubmit(async (data: ICallRenewal) => {
        
        const selectedperiodo = watch('period');
        data.period = selectedperiodo;
        data.page = 1;
        data.perPage = 10;

        const responservice: any = await getRenewalReport(data)
            .then(async (response) => {
                return response
            });
        // Quitar la última fila del array
        const dataArrayWithoutLastRow = responservice.data.array.slice(0, -1);
        
        setdataGridRenewal([])
        dataArrayWithoutLastRow.map((e) => {
            const list = {
                fund: e.fund,
                enabled: e.enabled,
                renewed: e.renewed,
                percentage: calculatePercentage(e.renewed, e.enabled),
            };
            dataGridRenewal.push(list);
            setdataGridRenewal(dataGridRenewal)
        });

        // La última fila Beca mejores bachilleres legalizados 
        const lastRow = responservice.data.array.slice(-1)[0];

        setenabledBachLeg(lastRow.enabled)
        setrenewedBachLeg(lastRow.renewed)
       
        //const percentage_BachLeg = 0 ? ((renewed_BachLeg / enabled_BachLeg) * 100).toFixed(2) + "%" : "0%";
    
  

    });
    useEffect(() => {
        setenabledBachLeg
    }, [enabledBachLeg ]);

    useEffect(() => {
        setrenewedBachLeg
    }, [renewedBachLeg ]);

    const onSubmit = handleSubmit(async (data: ICallRenewal) => {
        setShowTable(true)     
        setdataGridRenewal
    });


    const clearFields = () => {
        reset();
        tableComponentRef.current?.emptyData();
        setShowTable(false);
    };

    const downloadCollection = useCallback(() => {
        const { page, perPage } = paginateData;
        const periodo = watch('period');
        const url = new URL(`${urlApiFunds}/api/v1/renovacion/generate-xlsx`);
        const params = new URLSearchParams();
        params.append("page", page + 1)
        params.append("perPage", perPage + 10)

        if (periodo) {
            params.append("periodo", String(periodo));
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

    }, [paginateData,]

    );

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
        clearFields,
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
        renewedBachLeg
    }
}