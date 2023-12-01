import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiFunds } from "../../../../common/utils/base-url";
import * as XLSX from "xlsx";
export const ControlHook = (data) => {
  const { post } = useCrudService(urlApiFunds);
  const tableComponentRef = useRef(null);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [totalRestantes, setTotalRestates] = useState([]);
  const [totalInicial, setTotalInicial] = useState([]);
  const [TotalView, setTotalView] = useState(null);

  const urlControl = `${urlApiFunds}/api/v1/controlSelect/getInfoControl`;
  const getInfoControl = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoControl";
      const res: ApiResponse<[]> = await post(endpoint, data);
      let dataTotal = {
        inicial: null,
        restantes: null,
      };

      res.data["array"].forEach((data) => {
        dataTotal.inicial += Number(data.recursoInicial);
        dataTotal.restantes += Number(data.restante);

        return dataTotal;
      });
      if (res.data["array"].length > 0) {
        setTotalView(true);
        setTotalInicial(dataTotal.inicial);
        setTotalRestates(dataTotal.restantes);
      }
    } catch (error) {}
  };
  const { setMessage } = useContext(AppContext);
  useEffect(() => {
    tableComponentRef.current?.loadData({
      ...data,
    });

    getInfoControl(data);
  }, []);

  const downloadCollection = async () => {
    const endpoint = "/api/v1/controlSelect/getInfoControl";
    const res: ApiResponse<[]> = await post(endpoint, data);
    const dataRes = res.data["array"];
    let dataDownload = dataRes.map((data) => {
      return {
        "ID Comuna": data.comuna,
        Contrato: data.contrato,
        "Recurso inicial": data.recursoInicial,
        Restante: data.restante,
      };
    });

    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(dataDownload);
    XLSX.utils.book_append_sheet(book, sheet, "Control");
    setTimeout(() => {
      XLSX.writeFile(book, "Exporte Informe Control - Control.xlsx");
    }, 1000);
  };

  return {
    tableComponentRef,
    urlControl,
    setPaginateData,
    totalRestantes,
    totalInicial,
    downloadCollection,
    TotalView,
  };
};
