import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiFunds } from "../../../../common/utils/base-url";

export const ControlHook = (data) => {
  const { post } = useCrudService(urlApiFunds);
  const tableComponentRef = useRef(null);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [tableColumns, setTableColumns] = useState([]);
  const [totalRestantes, setTotalRestates] = useState([]);
  const [totalInicial, setTotalInicial] = useState([]);

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

      console.log(dataTotal);
      setTotalInicial(dataTotal.inicial);
      setTotalRestates(dataTotal.restantes);
    } catch (error) {}
  };
  const { setMessage } = useContext(AppContext);
  useEffect(() => {
    tableComponentRef.current?.loadData({
      ...data,
    });

    getInfoControl(data);
  }, []);

  return {
    tableComponentRef,
    tableColumns,
    urlControl,
    setPaginateData,
    totalRestantes,
    totalInicial,
  };
};
