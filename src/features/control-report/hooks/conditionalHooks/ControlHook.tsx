import { useContext, useRef, useState } from "react";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { ITableAction } from "../../../../common/interfaces";
import { ApiResponse } from "../../../../common/utils/api-response";
import { urlApiFunds } from "../../../../common/utils/base-url";

export const ControlHook = (data) => {
  const { post } = useCrudService(urlApiFunds);
  const tableComponentRef = useRef(null);
  const [tableColumns, setTableColumns] = useState([]);
  const getInfoControl = async (data) => {
    try {
      const endpoint = "/api/v1/controlSelect/getInfoControl";
      const res: ApiResponse<[]> = await post(endpoint, data);

      const dataRes = res.data["array"].map((data) => {});
    } catch (error) {}
  };
  const { setMessage, dataGridConsolidate, setGridConsolidate } =
    useContext(AppContext);

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

  return { tableComponentRef, tableColumns, tableActions, dataGridConsolidate };
};
