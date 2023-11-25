import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { controlReportSchema } from "../../../common/schemas/controlReport-shema";
import { ApiResponse } from "../../../common/utils/api-response";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";
import { number } from "yup";
import { AppContext } from "../../../common/contexts/app.context";
import Controlreporteditconsolidation from "../pages/control-report-edit-consolidation";
import { columnsConsolidados } from "../pages/config-columns/columns-consolidados";

export interface IControlReportFilter {
  noProject: string;
  validity: string;
  valueConvocatoria: string;
  idControlSelect: number;
}

export interface IConfig {
  columnsTable?: boolean;
  listConfigColumns: object;
}

export const useConsultControlReport = () => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(controlReportSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const urlGetConsult = `fondos/seguimiento-financiero`; // Endpoint del backend, (se colocan aquí)
  const [tableColumns, setTableColumns] = useState([]);
  const [controlReport] = watch(["controlReport"]);
  const { post } = useCrudService(urlApiFunds);
  const [totalNoPreseleccionados, setTotalNoPreseleccionados] = useState(null);
  const [totalOtorgado, setTotalOtorgado] = useState(null);
  const [totalNoCupos, setTotalNoCupos] = useState(null);
  const [totalRecursoDisponible, setTotalRecursoDisponible] = useState(null);
  const [totalDisponible, setTotalDisponible] = useState(null);
  const [totalPorParticipacion, setTotalPorParticipacion] = useState(null);
  const [totalNoLegalizados, setTotalNoLegalizados] = useState(null);
  const [totalRendimientoFinancieros, setTotalRendimientoFinancieros] =
    useState(null);
  const [formWatch, setFormWatch] = useState({
    noProject: "",
    validity: "",
  });

  const urlGet = `${urlApiFunds}/api/v1/controlSelect/getInfo`;
  const { setMessage } = useContext(AppContext);

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  //   const onSubmit = () => {
  //     if (config.columnsTable) {
  //       console.log("controlReport: ***", controlReport);
  //       console.log("config.listConfigColumns: ***", config.listConfigColumns);
  //       setTableColumns(config.listConfigColumns[controlReport]);
  //       setUrlGet(`${urlGetConsult}/${controlReport}`);
  //       //   urlGetConsult = `${urlGetConsult}/${controlReport}`;
  //     }
  //   };
  const getInfoConsolidado = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfo";
      const res: ApiResponse<[]> = await post(endpoint, data);

      const dataRes = res.data["array"].map((data) => {
        let dataColumns = {
          id: null,
          idResourcePrioritization: null,
          commune: null,
          consolidatedPreselected: null,
          places: null,
          consolidatedResourceAvailable: null,
          consolidatedGranted: null,
          Available: null,
          consolidatedLegalized: null,
          consolidatedFinancialReturns: null,
          porcentParticipacion: null,
        };

        dataColumns.id = data.id;
        dataColumns.commune = data.resourcePrioritization.communeId;
        dataColumns.consolidatedPreselected = data.consolidatedPreselected;
        dataColumns.places = data.resourcePrioritization.places;
        dataColumns.consolidatedResourceAvailable =
          data.consolidatedResourceAvailable;
        dataColumns.consolidatedGranted = data.consolidatedGranted;
        dataColumns.Available =
          data.consolidatedResourceAvailable - data.consolidatedGranted;
        dataColumns.consolidatedLegalized = data.consolidatedLegalized;
        dataColumns.consolidatedFinancialReturns =
          data.consolidatedFinancialReturns;
        dataColumns.porcentParticipacion = Math.round(
          (data.consolidatedGranted / data.consolidatedResourceAvailable) * 100
        );
        return dataColumns;
      });

      let totalData = {
        totalNoPreseleccionados: null,
        totalNoCupos: null,
        totalRecursoDisponible: null,
        totalOtorgado: null,
        totalDisponible: null,
        totalPorParticipacion: null,
        totalNoLegalizados: null,
        totalRendimientoFinancieros: null,
      };

      dataRes.forEach((e) => {
        totalData.totalNoPreseleccionados += Number(e.consolidatedPreselected);
        totalData.totalNoCupos += Number(e.places);
        totalData.totalRecursoDisponible += Number(
          e.consolidatedResourceAvailable
        );
        totalData.totalOtorgado += Number(e.consolidatedGranted);
        totalData.totalDisponible += Number(e.Available);
        totalData.totalPorParticipacion += Number(e.porcentParticipacion);
        totalData.totalNoLegalizados += Number(e.consolidatedLegalized);
        totalData.totalRendimientoFinancieros += Number(
          e.consolidatedFinancialReturns
        );
      });

      let totalDataRes = dataRes.length;
      totalData.totalPorParticipacion =
        totalData.totalPorParticipacion / totalDataRes;
      console.log(totalData);
      setTotalNoPreseleccionados(totalData.totalNoPreseleccionados);
      setTotalOtorgado(totalData.totalOtorgado);
      setTotalNoCupos(totalData.totalNoCupos);
      setTotalRecursoDisponible(totalData.totalRecursoDisponible);
      setTotalDisponible(totalData.totalDisponible);
      setTotalPorParticipacion(totalData.totalPorParticipacion);
      setTotalNoLegalizados(totalData.totalNoLegalizados);
      setTotalRendimientoFinancieros(totalData.totalRendimientoFinancieros);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTotalNoPreseleccionados;
    setTotalOtorgado;
    setTotalNoCupos;
    setTotalRecursoDisponible;
    setTotalDisponible;
    setTotalPorParticipacion;
    setTotalNoLegalizados;
    setTotalRendimientoFinancieros;
  }, [
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRendimientoFinancieros,
  ]);

  const tableActions: ITableAction<any>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        setMessage({
          show: true,
          background: true,
          description: <Controlreporteditconsolidation data={row} />,
          title: "Editar ítem",
          size: "items",
          items: true,
          onOk() {
            setMessage({});
          },
        });
      },
    },
  ];

  const onSubmit = handleSubmit((filters: IControlReportFilter) => {
    const { noProject, validity } = formWatch;
    filters.noProject = noProject;
    filters.validity = validity;
    filters.valueConvocatoria = "2023-1";

    if (filters.idControlSelect == 1) {
      setTableColumns(columnsConsolidados);
    }
    tableComponentRef.current?.loadData({
      ...filters,
    });
    getInfoConsolidado(filters);
    setTableView(true);
  });

  const updateOrSaveData = (data) => {
    console.log(data);
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    if (controlReport) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [controlReport]);

  return {
    tableComponentRef,
    setPaginateData,
    urlGet,
    tableView,
    onSubmit,
    register,
    control,
    errors,
    isValid,
    submitDisabled,
    handleChange,
    handleClean,
    tableColumns,
    updateOrSaveData,
    tableActions,
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRendimientoFinancieros,
  };
};
