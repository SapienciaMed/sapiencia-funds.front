import { useContext, useEffect, useRef, useState } from "react";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../../common/utils/base-url";
import { ITableAction } from "../../../../common/interfaces";
import { AppContext } from "../../../../common/contexts/app.context";
import ControlreporteditStratum456 from "../../pages/conditionalPagesEdits/control-report-edit-stratum456";
import { useGenericListService } from "../../../../common/hooks/generic-list-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import * as XLSX from "xlsx";
import { IGenericList } from "../../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../../common/constants/api.enum";
export const stratum456Hook = (data, reload) => {
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const { post } = useCrudService(urlApiFunds);
  const [totalOtorgado, setTotalOtorgado] = useState(null);
  const [totalRecursoDisponible, setTotalRecursoDisponible] = useState(null);
  const [totalPorParticipacion, setTotalPorParticipacion] = useState(null);
  const [totalNoLegalizados, setTotalNoLegalizados] = useState(null);
  const [totalDisponible, setTotalDisponible] = useState(null);
  const tableComponentRef = useRef(null);
  const urlGet = `${urlApiFunds}/api/v1/controlSelect/getInfoEstratos456`;
  const { setMessage } = useContext(AppContext);
  const { getListByGroupers } = useGenericListService();
  const [comunaList, setComunaList] = useState([]);
  const [TotalView, setTotalView] = useState(null);
  const [color, setColor] = useState(null);
  const tableActions: ITableAction<any>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        setMessage({
          show: true,
          background: true,
          description: (
            <ControlreporteditStratum456
              onEdit={() => {
                tableComponentRef.current?.loadData({
                  ...data, /// Filtro de busqueda
                });
              }}
              onUpdateTotals={() => {
                getInfoStatum456(data);
              }}
              data={row}
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

  const getInfoStatum456 = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoEstratos456Totals";
      const res: ApiResponse<[]> = await post(endpoint, data);
      let dataTotal = {
        resourceAvailable: null,
        granted: null,
        Available: null,
        porParticipacion: null,
        legalized: null,
      };
      let totaDataRes = res.data["array"].length;

      if (totaDataRes > 0) {
        setTotalView(true);

        res.data["array"].forEach((data) => {
          dataTotal.resourceAvailable += Number(data.resourceAvailable);
          dataTotal.granted += Number(data.granted);
          dataTotal.Available +=
            Number(data.resourceAvailable) - Number(data.granted);
          dataTotal.legalized += Number(data.legalized);
        });

        dataTotal.porParticipacion =
          (dataTotal.granted / dataTotal.resourceAvailable) * 100;

        if (
          isNaN(dataTotal.porParticipacion) ||
          dataTotal.porParticipacion == Infinity ||
          dataTotal.porParticipacion == undefined
        ) {
          dataTotal.porParticipacion = 0;
        }

        if (
          dataTotal.porParticipacion >= 90 &&
          dataTotal.porParticipacion <= 98
        ) {
          setColor("text-orange");
        } else if (
          dataTotal.porParticipacion > 98 &&
          dataTotal.porParticipacion <= 100
        ) {
          setColor("text-red");
        }
        setTotalOtorgado(dataTotal.granted);
        setTotalRecursoDisponible(dataTotal.resourceAvailable);
        setTotalDisponible(dataTotal.Available);
        setTotalNoLegalizados(dataTotal.legalized);
        setTotalPorParticipacion(dataTotal.porParticipacion.toFixed(2));
      } else {
        setTotalView(false);
      }
    } catch (error) {}
  };

  const downloadCollection = async () => {
    const endpoint = "/api/v1/controlSelect/getInfoEstratos456";
    const res: ApiResponse<[]> = await post(endpoint, data);
    const dataRes = res.data["array"];
    let dataDownload = dataRes.map((data) => {
      return {
        "Comuna o corregimiento": data.resourcePrioritization.communeId,
        "Recurso Disponible": data.resourceAvailable,
        Otorgado: data.granted,
        Disponible: Math.round(
          Number(data.resourceAvailable) - Number(data.granted)
        ),
        "%Participacion":
          Math.round(
            (Number(data.granted) / Number(data.resourceAvailable)) * 100
          ) + "%",

        "Numero de legalizados": data.legalized,
      };
    });

    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(dataDownload);
    XLSX.utils.book_append_sheet(book, sheet, "Estrato 456");
    setTimeout(() => {
      XLSX.writeFile(book, "Exporte Informe Control - Estrato 456.xlsx");
    }, 1000);
  };

  useEffect(() => {
    tableComponentRef.current?.loadData({
      ...data,
    });
    setTimeout(() => {
      getInfoStatum456(data);
    }, 1000);
  }, [reload]);
  return {
    setPaginateData,
    tableComponentRef,
    urlGet,
    tableActions,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRecursoDisponible,
    totalOtorgado,
    comunaList,
    TotalView,
    downloadCollection,
    color,
  };
};
