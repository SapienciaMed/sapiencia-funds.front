import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterBudget } from "../../../common/schemas/budget-schema";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import useBudgetApi from "./budget-api.hook";
import { ICallBudget } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import { urlApiFunds } from "../../../common/utils/base-url";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";



export default function useBudgetSearch() {
    const { setMessage } = useContext(AppContext);
    const resolver = useYupValidationResolver(filterBudget);
    const navigate = useNavigate();
    const [announcementList, setAnnouncementList] = useState([]);
    const [budgetList, setbudgetList] = useState([]);

    //peticiones api
    const { getAnnouncement, getbudget, downloadCallBudget } = useBudgetApi();

    const [typeMasterList, setTypeMasterList] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showDownload, setShowDownload] = useState(false);

    const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
    const [formWatch, setFormWatch] = useState({ id_comuna: "", periodo: "", });
    const [showDownloadButton, setShowDownloadButton] = useState(false);


    //ref
    const tableComponentRef = useRef(null);

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


// carga combos
useEffect(() => {
    getbudget().then((response) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setbudgetList(
          response.data.map((item) => ({
            name: item.id_comuna,
            value: item.id_comuna,
          }))
        );
      }
    });

    getAnnouncement().then((response) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setAnnouncementList(
          response.data.map((item) => ({
            name: item.name,
            value: item.id,
          }))
        );
      }
    });
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
                return <>{formaterNumberToCurrency(Number(row.presupuesto_comuna))}</>;
            },
        },
        {
            fieldName: "name",
            header: "Recurso otorgado de legalización",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(Number(row.acumulado_legali_comuna))}</>;
            },
        },
        {
            fieldName: "name",
            header: "Restante",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(Number(row.restante_presupuesto_comuna))}</>;
            },
        },
        {
            fieldName: "name",
            header: "Usuarios por comuna",
            renderCell: (row) => {
                return <>{row.numero_usuarios_comuna}</>;
            },
        },
        {
            fieldName: "name",
            header: "Total proyectado",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(Number(row.total_proyectado))}</>;
            },
        },
        {
            fieldName: "name",
            header: "Diferencia por comprometer",
            renderCell: (row) => {
                return <>{formaterNumberToCurrency(Number(row.Diferencia))}</>;
            },
        },
    ];

    const tableActions: ITableAction<ICallBudget>[] = [

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
            setShowDownload(false);
        }
    }, []);

    const clearFields = () => {
        reset();
        tableComponentRef.current?.emptyData();
        setShowTable(false);
        setShowDownload(false);
    };

    const onSubmit = handleSubmit(async (data: ICallBudget) => {
        setShowTable(true)
        setShowDownloadButton(true);

        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(data);
        }
    });

    const [id_comuna, periodo] = watch([
        "id_comuna", "periodo",
    ])

    const downloadCollection = useCallback(() => {
        const { page, perPage } = paginateData;
        const id_comuna = watch('id_comuna');
        const periodo = watch('periodo');
        const url = new URL(`${urlApiFunds}/api/v1/presupuesto/generate-xlsx`);
        const params = new URLSearchParams();
        params.append("page", page + 1)
        params.append("perPage", perPage + 10)

        if (Array.isArray(id_comuna) && id_comuna.length > 0) {
            params.append("id_comuna", id_comuna.join(','));
        } else if (typeof id_comuna === 'number') {
            params.append("id_comuna", String(id_comuna));
        }
        
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

    }, [paginateData, formWatch, id_comuna, periodo]

    );


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
        showDownloadButton,
        tableActions,
    }

}
