import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ITableElement } from "../../../../common/interfaces";
import { urlApiFunds } from "../../../../common/utils/base-url";
import { IControlPay } from "../../../../common/interfaces/control.report.interface";
import { AppContext } from "../../../../common/contexts/app.context";

export const usePagareHook = (data, ) => {
  const { setMessage } = useContext(AppContext);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const tableComponentRef = useRef(null);
  const urlGet = `${urlApiFunds}api/v1/controlSelect/getInfopay`;


    const tableColumns: ITableElement<IControlPay>[] = [
        {
          fieldName: "fondo",
          header: "Modalidad aspirante",
          renderCell: (row) => {
            return <>{row.programa}</>;
          },
        },
        {
          fieldName: "PagareAprobado",
          header: "Aprobado",
          renderCell: (row) => {
            return <>{row.aprobado}</>;
          },
        },
        {
          fieldName: "PagareEntregado",
          header: "Pagaré entregado",
          renderCell: (row) => {
            return <>{row.entregado}</>;
          },
        },
        {
          fieldName: "SinEntregarPagare",
          header: "Sin entregar",
          renderCell: (row) => {
            return <>{row.sin_entregar}</>;
          },
        },
        {
            fieldName: "NoAplica",
            header: "No aplica",
            renderCell: (row) => {
              return <>{row.no_aplica}</>;
            },
          },
        
      ];

    const downloadCollection = useCallback(() => {
        const { page, perPage } = paginateData;
        //const periodo = watch('periodo');
        const url = new URL(`${urlApiFunds}/api/v1/presupuesto/generate-xlsx`);
        const params = new URLSearchParams();
        params.append("page", page + 1)
        params.append("perPage", perPage + 10)

        
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
            OkTitle: "Cerrar"
          });

    }, [paginateData,]

    );

    const getInfoControl = async (data) => {

    };

    
    useEffect(() => {
      const body = {
        idControlSelect: data.idControlSelect,
        idConvocatoria: data.idConvocatoria
      }
      console.log("",body)
      tableComponentRef.current?.loadData({
        ...body,
      });
    }, []);
  


    
    return {
        tableColumns,
        urlGet,
        tableComponentRef,
        setPaginateData,
        downloadCollection,
    };
}