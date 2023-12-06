import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../../common/contexts/app.context";
import useStratum123Api from "./stratum123-api.hooks";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { useGenericListService } from "../../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../../common/interfaces/global.interface";
import { ApiResponse } from "../../../../common/utils/api-response";

export const stratum123Hook = (data, objSet, reload) => {
  const tableComponentRef = useRef(null);
  const { getListByGroupers } = useGenericListService();
  const [comunaList, setComunaList] = useState([]);
  const { setMessage } = useContext(AppContext);
  const {
    setTotalNoLegalizados,
    setTotalPorParticipacion,
    setTotalDisponible,
    setTotalRecursoDisponible,
    setTotalOtorgado,
    setDataGridStratum,
  } = objSet;

  const { getEstratum123, downloadFile } = useStratum123Api();

  useEffect(() => {
    const aux = async () => {
      if (data) {
        const res: any = await getEstratum123(data);
        if (res && res?.operation?.code === EResponseCodes.OK) {
          setDataGridStratum(res.data.array);
          const recursosdisponibles = res.data.array.reduce(
            (sum, i) => sum + Number(i.resourceAvailable),
            0
          );
          const legalizados = res.data.array.reduce(
            (sum, i) => sum + Number(i.legalized),
            0
          );
          const disponibles = res.data.array.reduce(
            (sum, i) => sum + Number(i.granted - i.resourceAvailable),
            0
          );
          const participacion = res.data.array.reduce(
            (sum, i) =>
              sum + (Number(i.granted) / Number(i.resourceAvailable)) * 100,
            0
          );
          const otorgado = res.data.array.reduce(
            (sum, i) => sum + Number(i.granted),
            0
          );
          setTotalNoLegalizados(legalizados);
          setTotalPorParticipacion(participacion.toFixed(2));
          setTotalDisponible(disponibles);
          setTotalRecursoDisponible(recursosdisponibles);
          setTotalOtorgado(otorgado);
        }
      }
    };
    setTimeout(() => {
      aux();
    }, 1000);
  }, [data]);

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

  const onsearchSubmintControl = async () => {
    if (data) {
      const res: any = await getEstratum123(data);
      if (res && res?.operation?.code === EResponseCodes.OK) {
        setTotalNoLegalizados(0);
        setTotalPorParticipacion(0);
        setTotalDisponible(0);
        setTotalRecursoDisponible(0);
        setTotalOtorgado(0);
        setDataGridStratum(res.data.array);
        const recursosdisponibles = res.data.array.reduce(
          (sum, i) => sum + Number(i.resourceAvailable),
          0
        );
        const legalizados = res.data.array.reduce(
          (sum, i) => sum + Number(i.legalized),
          0
        );
        const disponibles = res.data.array.reduce(
          (sum, i) => sum + Number(i.granted - i.resourceAvailable),
          0
        );
        const participacion = res.data.array.reduce(
          (sum, i) =>
            sum + (Number(i.granted) / Number(i.resourceAvailable)) * 100,
          0
        );
        const otorgado = res.data.array.reduce(
          (sum, i) => sum + Number(i.granted),
          0
        );
        setTotalNoLegalizados(legalizados);
        setTotalPorParticipacion(participacion.toFixed(2));
        setTotalDisponible(disponibles);
        setTotalRecursoDisponible(recursosdisponibles);
        setTotalOtorgado(otorgado);
      }
    }
  };

  const downloadXLSX = async () => {
    await downloadFile(data).then((resp: any) => {
      const buffer = new Uint8Array(resp.data.data); // Convierte el Array del búfer en Uint8Array
      const blob = new Blob([buffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Estratos123.xls`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage({
        title: `Descargar`,
        description: `¡Descargado exitosamente!`,
        show: true,
        OkTitle: "Aceptar",
        background: true,
      });
    });
  };

  useEffect(() => {
    tableComponentRef.current?.loadData({
      ...data,
    });
  }, [reload]);

  return {
    onsearchSubmintControl,
    tableComponentRef,
    comunaList,
    downloadXLSX,
  };
};
