import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterBudget } from "../../../common/schemas/budget-schema";
import { RiFileExcel2Line } from "react-icons/ri";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { ICallBudget } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import useRenewalReportApi from "./renewal-report-api.hook";


export default function useRenewaReportSearch() {
    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterBudget);
    const navigate = useNavigate();


    //peticiones api
    const { getAnnouncement} = useRenewalReportApi();
    const tableComponentRef = useRef(null);
    const [showTable, setShowTable] = useState(false);
    const [announcementList, setAnnouncementList] = useState([]);

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
            header: "Fondo",
            renderCell: (row) => {
                return <>{row.id_comuna}</>;
            },
        },
        {
            fieldName: "name",
            header: "Nro habilitados",
            renderCell: (row) => {
                return <>{}</>;
            },
        },       
        {
            fieldName: "name",
            header: "Nro renovados",
            renderCell: (row) => {
                return <>{}</>;
            },
        },
        {
            fieldName: "name",
            header: "Porcentaje",
            renderCell: (row) => {
                return <>{}</>;
            },
        },
        
    ];

    const tableActions: ITableAction<ICallBudget>[] = [
        {
          icon: "Edit",
          onClick: (row) => navigate("/" + row.id_comuna),
        },
      ];


    const onSubmit = handleSubmit(async (data: ICallBudget) => {        
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
        tableColumns,
        tableActions,
        tableComponentRef,
        onSubmit,
        reset,
        clearFields,
        announcementList,
      }
}