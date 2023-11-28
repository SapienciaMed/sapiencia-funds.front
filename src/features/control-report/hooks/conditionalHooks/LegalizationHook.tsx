import { useContext, useEffect, useRef, useState } from "react";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiFunds } from "../../../../common/utils/base-url";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { AppContext } from "../../../../common/contexts/app.context";
import { ITableAction } from "../../../../common/interfaces";
import ControlreporteditLegalization from "../../pages/conditionalPagesEdits/ControlreporteditLegalization";

export const LegalizationHook = (data) => {
  const tableComponentRef = useRef(null);
  const { setMessage } = useContext(AppContext);
  const { post } = useCrudService(urlApiFunds);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [totalNoPreseleccionados, setTotalNoPreseleccionados] = useState(null);
  const [totalOtorgado, setTotalOtorgado] = useState(null);
  const [totalNoCupos, setTotalNoCupos] = useState(null);
  const [totalRecursoDisponible, setTotalRecursoDisponible] = useState(null);
  const [totalDisponible, setTotalDisponible] = useState(null);
  const [totalPorParticipacion, setTotalPorParticipacion] = useState(null);
  const [totalNoLegalizados, setTotalNoLegalizados] = useState(null);
  const urlGetLegalization = `${urlApiFunds}/api/v1/controlSelect/getInfoLegalization`;
  const getInfoLegalization = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoLegalization";
      const res: ApiResponse<[]> = await post(endpoint, data);
      const dataRes = res.data["array"].map((data) => {
        let dataColumns = {
          id: null,
          program: null,
          legalizationPreselected: null,
          places: null,
          legalizationResourceAvailable: null,
          legalizationGranted: null,
          Available: null,
          porcentParticipacion: null,
          legalizationLegalized: null,
        };
        dataColumns.program = data.program;
        dataColumns.id = data.id;
        dataColumns.legalizationPreselected = Number(data.Preselected);
        dataColumns.places = Number(data.places);
        dataColumns.legalizationResourceAvailable = Number(
          data.Availableresources
        );
        dataColumns.legalizationGranted = Number(data.Granted);
        dataColumns.Available =
          Number(data.Availableresources) - Number(data.Granted);
        dataColumns.porcentParticipacion = Math.round(
          (Number(data.Granted) / Number(data.Availableresources)) * 100
        );
        dataColumns.legalizationLegalized = Number(data.Legalized);
        if (dataColumns.porcentParticipacion == Infinity) {
          dataColumns.porcentParticipacion = 0;
        }
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
      };

      dataRes.forEach((e) => {
        totalData.totalNoPreseleccionados += Number(e.legalizationPreselected);
        totalData.totalNoCupos += Number(e.places);
        totalData.totalRecursoDisponible += Number(
          e.legalizationResourceAvailable
        );
        totalData.totalOtorgado += Number(e.legalizationGranted);
        totalData.totalDisponible += Number(
          e.legalizationResourceAvailable - e.legalizationGranted
        );
        totalData.totalNoLegalizados += Number(e.legalizationPreselected);
        totalData.totalPorParticipacion += Number(e.porcentParticipacion);
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
    } catch (error) {}
  };

  const tableActions: ITableAction<any>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        setMessage({
          show: true,
          background: true,
          description: <ControlreporteditLegalization data={row} />,
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
    getInfoLegalization(data);
  }, []);

  return {
    tableComponentRef,
    urlGetLegalization,
    tableActions,
    setPaginateData,
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
  };
};
