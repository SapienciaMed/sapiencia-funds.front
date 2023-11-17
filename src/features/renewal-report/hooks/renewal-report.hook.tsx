import { useContext, useEffect, useRef, useState } from "react";
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


export default function useRenewaReportSearch() {
    const { setMessage, setdataGridRenewal, dataGridRenewal } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterBudget);
    const navigate = useNavigate();


    //peticiones api
    const { getAnnouncement, getRenewalReport} = useRenewalReportApi();
    const tableComponentRef = useRef(null);
    const [showTable, setShowTable] = useState(false);
    const [announcementList, setAnnouncementList] = useState([]);
    const [renewalReport, setRenewalReport] = useState([]);

    const {
        handleSubmit,
        register,  
        setValue,
        reset,
        control: control,
        formState: { errors },
        watch,
    } = useForm<ICallRenewal>(
        {  }
    );


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


  // carga combos
  useEffect(() => {
    searchRenewal();
    console.log("*****cargar ...", renewalReport)
  }, []);



    const searchRenewal = handleSubmit(async (data: ICallRenewal) => {        
        // Cambio en el selector del periodo
        const selectedperiodo = watch('periodo');
        data.periodo = selectedperiodo;
        data.page = 1;
        data.perPage = 10;
        
        getRenewalReport(data)
            .then((response) => {
                console.log("******response", response);
     
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    let dataArray;
     
                    if (Array.isArray(response.data)) {
                        dataArray = response.data;
                    } else if (typeof response.data === 'object' && response.data !== null) {
                        // Tratar la respuesta como un objeto individual
                        dataArray = [response.data];
                    } else {
                        console.error('La propiedad "data" de la respuesta de la API no es un array:', response.data);
                        return;
                    }
                      const renewal = dataArray.map((item) => ({
                            Fondo: item.Fondo,
                            No_Habilitados: item.No_Habilitados,
                            No_Renovados: item.No_Renovados,
                        }))
                        setRenewalReport(renewal);
 
                }
            });

            dataGridRenewal.push({
                Fondo: "Beca Mejores Bachilleres Renueva",
                No_Habilitados: "142",
                No_Renovados:"385",
                Porcentaje:"89%"

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
      }
}