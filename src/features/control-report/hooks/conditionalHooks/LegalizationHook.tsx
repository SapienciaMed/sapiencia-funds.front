import { useContext, useEffect, useRef, useState } from "react";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiFunds } from "../../../../common/utils/base-url";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { AppContext } from "../../../../common/contexts/app.context";
import { ITableAction } from "../../../../common/interfaces";
import { columnsLegalization } from "../../pages/config-columns/columns-legalization";

export const LegalizationHook = (data) => {
  const tableComponentRef = useRef(null);
  const { setMessage, dataGridConsolidate, setGridConsolidate } =
    useContext(AppContext);
  const { post } = useCrudService(urlApiFunds);

  const [tableColumns, setTableColumns] = useState([]);
  const getInfoLegalization = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoLegalization";
      const res: ApiResponse<[]> = await post(endpoint, data);
      const dataRes = res.data["array"].map((data) => {
        let dataColumns = {
          id: null,
          idResourcePrioritization: null,
          legalizationPreselected: null,
          places: null,
          legalizationResourceAvailable: null,
          legalizationGranted: null,
          Available: null,
          porcentParticipacion: null,
          legalizationLegalized: null,
        };

        dataColumns.id = data.id;
        dataColumns.idResourcePrioritization = data.idResourcePrioritization;
        dataColumns.legalizationPreselected = data.legalizationPreselected;
        dataColumns.places = data.places;
        dataColumns.legalizationResourceAvailable =
          data.legalizationResourceAvailable;
        dataColumns.legalizationGranted = data.legalizationGranted;
        dataColumns.Available =
          data.legalizationResourceAvailable - data.legalizationGranted;
        dataColumns.porcentParticipacion = Math.round(
          data.legalizationGranted / data.legalizationResourceAvailable
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

      setTableColumns(columnsLegalization);
    } catch (error) {}
  };

  const tableActions: ITableAction<any>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        setMessage({
          show: true,
          background: true,
          description: "",
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
    getInfoLegalization(data);
  }, []);

  return { tableComponentRef, tableColumns, tableActions, dataGridConsolidate };
};
