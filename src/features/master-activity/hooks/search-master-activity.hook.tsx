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
import { filtermasterActivity } from "../../../common/schemas/master-schema";


export default function useSearchMasterHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getActivity, getActivityById } = useActivityService();

  //states
  const [showTable, setshowTable] = useState(false);
  const [activity, setActivity] = useState<IDropdownProps[]>([]);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  // carga combos
  useEffect(() => {
    loadDropdown();
  }, []);

  //functions
  const loadDropdown = async () => {
    //charges
    const { data, operation } = await getActivity();
    if (operation.code === EResponseCodes.OK) {
      const activityList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });

      setActivity(activityList);
    } else {
      setActivity([]);
    }
  };

    const resolver = useYupValidationResolver(filtermasterActivity);

  const { register, handleSubmit, formState, control, watch } =
    useForm<IMasterActivityFilter>({ resolver });

  const tableColumns: ITableElement<IMasterActivity>[] = [
    {
      fieldName: "row.activity.name",
      header: "Actividad",
      renderCell: (row) => {
        return <>{row.name}</>;
      },
    },
    {
      fieldName: "row.activity.value",
      header: "Valor",
      renderCell: (row) => {
        return <>{row.totalValue}</>;
      },
    },
    {
      fieldName: "row.activity.programa",
      header: "Programa",
      renderCell: (row) => {
        return <>{row.typesProgram.name}</>;
      },
    },
    {
      fieldName: "row.activity.descripcion",
      header: "Descripción",
      renderCell: (row) => {
        return <>{row.description}</>;
      },
    },
    
  ];
  
  const tableActions: ITableAction<IMasterActivity>[] = [
    {
      icon: "Edit",
      onClick: (row) => navigate("/fondos/maestro/editar/" + row.id),
    },
  ];

  const redirectCreate = () => {
    navigate("../crear");
  };

  const formValues = watch();

  const onSubmit = handleSubmit(async (data: IMasterActivity) => {
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
    redirectCreate,
    formValues,
    showTable,
    activity,
    tableComponentRef,
    tableColumns,
    tableActions,
  };
}
