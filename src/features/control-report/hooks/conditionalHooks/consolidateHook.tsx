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
import { IGenericList } from "../../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { useGenericListService } from "../../../../common/hooks/generic-list-service.hook";
export const consolidateHook = (data, reload) => {
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
  const { getListByGroupers } = useGenericListService();
  const [comunaList, setComunaList] = useState([]);
  const [TotalView, setTotalView] = useState(null);
  const [color, setColor] = useState(null);
  const getInfoConsolidado = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoConsolidateTotals";
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
      let totalDataRes = dataRes.length;

      if (totalDataRes > 0) {
        setTotalView(true);

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
          totalData.totalNoPreseleccionados += Number(
            e.consolidatedPreselected
          );
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

        totalData.totalPorParticipacion =
          (totalData.totalOtorgado / totalData.totalRecursoDisponible) * 100;

        if (
          totalData.totalPorParticipacion >= 90 &&
          totalData.totalPorParticipacion <= 98
        ) {
          setColor("text-orange");
        } else if (
          totalData.totalPorParticipacion > 98 &&
          totalData.totalPorParticipacion <= 100
        ) {
          setColor("text-red");
        }

        setTotalNoPreseleccionados(totalData.totalNoPreseleccionados);
        setTotalOtorgado(totalData.totalOtorgado);
        setTotalNoCupos(totalData.totalNoCupos);
        setTotalRecursoDisponible(totalData.totalRecursoDisponible);
        setTotalDisponible(totalData.totalDisponible);
        setTotalPorParticipacion(totalData.totalPorParticipacion.toFixed(2));
        setTotalNoLegalizados(totalData.totalNoLegalizados);
        setTotalRendimientoFinancieros(totalData.totalRendimientoFinancieros);
        setTableColumns(columnsConsolidados);
      } else {
        setTotalView(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const aux = () => {
      const groupers = ["COMUNA_CORREGIMIENTO"];
      getListByGroupers(groupers).then(
        (response: ApiResponse<IGenericList[]>) => {
          if (response && response?.operation?.code === EResponseCodes.OK) {
            setComunaList(
              response.data.map((item) => {
                const list = {
                  name: item.itemDescription,
                  value: item.itemCode,
                };
                return list;
              })
            );
          }
        }
      );
    };
    aux();
  }, []);

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
          description: (
            <Controlreporteditconsolidation
              onEdit={() => {
                tableComponentRef.current?.loadData({
                  ...data, /// Filtro de busqueda
                });
              }}
              data={row}
              onUpdateTotals={() => {
                getInfoConsolidado(data);
              }}
            />
          ),
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
    setTimeout(() => {
      getInfoConsolidado(data);
    }, 1000);
  }, [reload]);

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
    comunaList,
    TotalView,
    color,
  };
};
