import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { urlApiFunds } from "../../../../common/utils/base-url";
import { AppContext } from "../../../../common/contexts/app.context";

export const usePagareHook = (data) => {
  const { setMessage } = useContext(AppContext);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const tableComponentRef = useRef(null);
  const urlGet = `${urlApiFunds}/api/v1/controlSelect/getInfoConsolidatepay`;

  const downloadCollection = useCallback(() => {
    const { page, perPage } = paginateData;
    //const periodo = watch('periodo');
    const url = new URL(`${urlApiFunds}/api/v1/presupuesto/generate-xlsx`);
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage + 10);

    //if (periodo) {
    //    params.append("periodo", String(periodo));
    // }

    url.search = params.toString();
    window.open(url.toString(), "_blank");
    setMessage({
      title: "Descargar",
      description: "Información descargada exitosamente",
      show: true,
      background: true,
      OkTitle: "Cerrar",
    });
  }, [paginateData]);

  const getInfoControl = async (data) => {};

  useEffect(() => {
    const body = {
      idControlSelect: data.idControlSelect,
      idConvocatoria: data.idConvocatoria,
    };
    console.log("", body);
    tableComponentRef.current?.loadData({
      ...body,
    });
  }, []);
  return {
    urlGet,
    tableComponentRef,
    setPaginateData,
    downloadCollection,
  };
};
