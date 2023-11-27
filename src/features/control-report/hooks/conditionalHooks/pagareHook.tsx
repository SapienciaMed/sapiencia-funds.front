import { useCallback, useContext, useRef, useState } from "react";
import { ITableElement } from "../../../../common/interfaces";
import { urlApiFunds } from "../../../../common/utils/base-url";
import { IControlPay } from "../../../../common/interfaces/control.report.interface";
import { AppContext } from "../../../../common/contexts/app.context";

export const usePagareHook = (data) => {
  const { setMessage } = useContext(AppContext);
    const tableComponentRef = useRef(null);
    const urlGet = `${urlApiFunds}/api/v1/controlSelect/getInfo`;
    const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });

    
    const tableColumns: ITableElement<IControlPay>[] = [
        {
          fieldName: "row.activity.name",
          header: "Modalidad aspirante",
          renderCell: (row) => {
            return <>{row.programa}</>;
          },
        },
        {
          fieldName: "row.activity.value",
          header: "Aprobado",
          renderCell: (row) => {
            return <>{row.aprobado}</>;
          },
        },
        {
          fieldName: "row.activity.programa",
          header: "Pagaré entregado",
          renderCell: (row) => {
            return <>{row.entregado}</>;
          },
        },
        {
          fieldName: "row.activity.descripcion",
          header: "Sin entregar",
          renderCell: (row) => {
            return <>{row.sin_entregar}</>;
          },
        },
        {
            fieldName: "row.activity.descripcion",
            header: "No aplica",
            renderCell: (row) => {
              return <>{row.no_aplica}</>;
            },
          },
        
      ];

      //tableComponentRef.current.loadData(data);

    
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


    
    return {
        tableColumns,
        tableComponentRef,
        urlGet,
        downloadCollection,
    };
}