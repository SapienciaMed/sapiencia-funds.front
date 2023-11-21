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
    const [renewalReport, setRenewalReport] = useState([]);
    const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });

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



    const searchRenewal = handleSubmit(async (data: ICallRenewal) => {
        // Cambio en el selector del periodo
        const selectedperiodo = watch('period');
        data.period = selectedperiodo;
        data.page = 1;
        data.perPage = 10;

        const responservice: any = await getRenewalReport(data)
            .then(async (response) => {

                return response

            });

        responservice.data.array.map((e) => {
            const percentage = (e.renewed / e.enabled) * 100 || 0; // Evita dividir por cero
            const list = {
                fund: e.fund,
                enabled: e.enabled,
                renewed: e.renewed,
                percentage: percentage.toFixed(2), 
            }
            dataGridRenewal.push(list)


        })
    });


    const onSubmit = handleSubmit(async (data: ICallRenewal) => {
        setShowTable(true)

        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(data);
        }
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
    }
}