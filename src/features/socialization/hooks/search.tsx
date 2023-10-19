import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IMasterActivityFilter,
  IMasterActivity,
} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import useActivityService from "../../../common/hooks/activity-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ISocialization } from "../../../common/interfaces/socialization.interface";
import { searchSocialization } from "../../../common/schemas/socialization-schema";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";

export default function useSearchSocialization() {
  // Context
  const { setMessage } = useContext(AppContext);

  //states
  const [showTable, setshowTable] = useState(false);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  const resolver = useYupValidationResolver(searchSocialization);

  const { register, handleSubmit, formState, control, watch, reset } =
    useForm<ISocialization>({ resolver });
  const { getListByParent } = useGenericListService();

  const [deparmetList, setDeparmentList] = useState([]);

  useEffect(() => {
    getListByParent({ grouper: "DEPARTAMENTOS", parentItemCode: "COL" }).then(
      (response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setDeparmentList(
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
  }, []);

  const tableColumns: ITableElement<ISocialization>[] = [
    {
      fieldName: "row.socialization.socializationDate",
      header: "Fecha",
      renderCell: (row) => {
        return <>{row.socializationDate}</>;
      },
    },
    {
      fieldName: "row.socialization.valueGroup",
      header: "Grupo de valor",
      renderCell: (row) => {
        return <>{row.valueGroup}</>;
      },
    },
    {
      fieldName: "row.socialization.financialPerformance",
      header: "Rendimientos financieros",
      renderCell: (row) => {
        return <>{row.financialPerformance}</>;
      },
    },
    {
      fieldName: "row.socialization.portfolioCollection",
      header: "Recaudos de cartera",
      renderCell: (row) => {
        return <>{row.portfolioCollections}</>;
      },
    },
    {
      fieldName: "row.socialization.descripcion",
      header: "Descripción",
      renderCell: (row) => {
        return <>{row.description}</>;
      },
    },
  ];

  const tableActions: ITableAction<ISocialization>[] = [
    {
      icon: "Edit",
      onClick: (row) => navigate("/fondos/socialization/form/" + row.id),
    },
  ];

  const formValues = watch();

  const newElement = () => navigate("form");

  //servicio de busqueda
  const onSubmit = handleSubmit(async (data: ISocialization) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  return {
    register,
    control,
    formState,
    onSubmit,
    formValues,
    showTable,
    tableComponentRef,
    tableColumns,
    tableActions,
    deparmetList,
    newElement,
    reset,
  };
}
