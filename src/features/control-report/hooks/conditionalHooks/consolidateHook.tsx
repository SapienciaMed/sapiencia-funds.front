import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../../common/utils/base-url";
import { AppContext } from "../../../../common/contexts/app.context";
import { ApiResponse } from "../../../../common/utils/api-response";
import { ITableAction } from "../../../../common/interfaces";
import { columnsConsolidados } from "../../pages/config-columns/columns-consolidados";
import Controlreporteditconsolidation from "../../pages/conditionalPagesEdits/control-report-edit-consolidation";
import * as XLSX from "xlsx";
export const consolidateHook = (data) => {
  const navigate = useNavigate();
  const [tableColumns, setTableColumns] = useState([]);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
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
  const tableComponentRef = useRef(null);
  const urlGet = `${urlApiFunds}/api/v1/controlSelect/getInfoConsolidate`;
  const { setMessage } = useContext(AppContext);

  const getInfoConsolidado = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoConsolidate";
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
      setTotalNoPreseleccionados(totalData.totalNoPreseleccionados);
      setTotalOtorgado(totalData.totalOtorgado);
      setTotalNoCupos(totalData.totalNoCupos);
      setTotalRecursoDisponible(totalData.totalRecursoDisponible);
      setTotalDisponible(totalData.totalDisponible);
      setTotalPorParticipacion(totalData.totalPorParticipacion);
      setTotalNoLegalizados(totalData.totalNoLegalizados);
      setTotalRendimientoFinancieros(totalData.totalRendimientoFinancieros);

      setTableColumns(columnsConsolidados);
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

  const downloadCollection = async () => {
    const endpoint = "/api/v1/controlSelect/getInfoConsolidate";
    const res: ApiResponse<[]> = await post(endpoint, data);
    const dataRes = res.data["array"];
    let dataDownload = dataRes.map((data) => {
      return {
        "Comuna o corregimiento": data.resourcePrioritization.communeId,
        "No.Preseleccionados": data.consolidatedPreselected,
        "No.Cupos": data.places,
        "Recurso Disponible": data.consolidatedResourceAvailable,
        Otorgado: data.consolidatedGranted,
        Disponible: Math.round(
          Number(data.consolidatedResourceAvailable) -
            Number(data.consolidatedGranted)
        ),
        "%Participacion":
          Math.round(
            (Number(data.consolidatedGranted) /
              Number(data.consolidatedResourceAvailable)) *
              100
          ) + "%",

        "Numero de legalizados": data.consolidatedLegalized,
        "Rendimientos financieros": data.consolidatedFinancialReturns,
      };
    });

    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(dataDownload);
    XLSX.utils.book_append_sheet(book, sheet, "Consolidado");
    setTimeout(() => {
      XLSX.writeFile(book, "Exporte Informe Control - Consolidado.xlsx");
    }, 1000);
  };

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

  useEffect(() => {
    tableComponentRef.current?.loadData({
      ...data,
    });
    getInfoConsolidado(data);
  }, []);

  return {
    tableComponentRef,
    urlGet,
    setPaginateData,
    tableColumns,
    tableActions,
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRendimientoFinancieros,
    downloadCollection,
  };
};
