import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlApiFunds } from "../../../../common/utils/base-url";
import { AppContext } from "../../../../common/contexts/app.context";
import { ApiResponse } from "../../../../common/utils/api-response";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import * as XLSX from "xlsx"
import { EResponseCodes } from "../../../../common/constants/api.enum";

export const usePagareHook = (data) => {
  const navigate = useNavigate();
  const { post } = useCrudService(urlApiFunds);
  const { setMessage } = useContext(AppContext);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [totalAprobado, setTotalAprobado] = useState(null);
  const [totalEntregado, setTotalEntregado] = useState(null);
  const [totalEntregar, setTotalEntregar] = useState(null);
  const [totalNoAplica, setTotalNoAplica] = useState(null);
  const [dataForDownload, setDataForDownload] = useState(null);
  const tableComponentRef = useRef(null);
  const urlGet = `${urlApiFunds}/api/v1/controlSelect/getInfoConsolidatepay`;
  const getInfoControl = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoConsolidatepay";
      const res: ApiResponse<[]> = await post(endpoint, data);
  
      let dataTotal = {
        PagareAprobado: 0,
        PagareEntregado: 0,
        SinEntregarPagare: 0,
        NoAplica: 0,
      };
  
      res.data["array"].forEach((data) => {
        dataTotal.PagareAprobado += Number(data.PagareAprobado);
        dataTotal.PagareEntregado += Number(data.PagareEntregado);
        dataTotal.SinEntregarPagare += Number(data.SinEntregarPagare);
        dataTotal.NoAplica += Number(data.NoAplica);
      });
  
        setTotalAprobado(dataTotal.PagareAprobado);
        setTotalEntregado(dataTotal.PagareEntregado);
        setTotalEntregar(dataTotal.SinEntregarPagare);
        setTotalNoAplica(dataTotal.NoAplica);

        setDataForDownload(res.data["array"])

    } catch (error) {
      // Handle error
    }
  };
  

  useEffect(() => {
    const body = {
      idControlSelect: data.idControlSelect,
      idConvocatoria: data.idConvocatoria,
    };
   
    tableComponentRef.current?.loadData({
      ...body,
    });
    getInfoControl(data);
  }, []);

  
  function downloadCollection(data) {

    const book = XLSX.utils.book_new()
    const sheet = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(book, sheet, `Control financiero`)

    setTimeout(() => {
        XLSX.writeFile(book, `Control financiero Pagare.xlsx`)
        setMessage({
            title: "Descargar",
            description: "Información descargada exitosamente ",
            OkTitle: "Cerrar",
            show: true,
            type: EResponseCodes.OK,
            background: true,
            onOk() {
                setMessage({});
                //navigate(-1);
            },
            onClose() {
                setMessage({});
                //navigate(-1);
            },
        });
    }, 1000)

}


  return {
    urlGet,
    tableComponentRef,
    setPaginateData,
    totalAprobado,
    totalEntregado,
    totalEntregar,
    totalNoAplica,
    downloadCollection,
    dataForDownload,
  };
};
