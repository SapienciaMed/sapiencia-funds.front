import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {ITableAction,ITableElement,} from "../../../common/interfaces/table.interfaces";
import {IMasterActivityFilter, IMasterActivity} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import useActivityService from "../../../common/hooks/activity-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import {
    DataItem,
    ResponsiveTable,
  } from "../../../common/components/Form/table-detail.component";


export default function useSearchMasterHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getActivity } = useActivityService();

  //states
  const [showTable, setshowTable] = useState(false);
  const [activity, setActivity] = useState<IDropdownProps[]>([]);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState, reset, watch } =
  useForm<IMasterActivityFilter>({
    //resolver,
    mode: "all",
    defaultValues: { 
      id: null,
    },
  });

  const formValues = watch();

const redirectCreate = () => {
 navigate("../crear");
};

const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    setshowTable(false);
};

const onSubmit = handleSubmit(async (data: IMasterActivity) => {
  setshowTable(true);

  if (tableComponentRef.current) {
    tableComponentRef.current.loadData(data);
  }
});


  // carga combos
  useEffect(() => {
    loadDropdown();
  }, []);

  //functions
  const loadDropdown = async () => {
    //charges
    const { data, operation } = await getActivity();
    if (operation.code === EResponseCodes.OK) {
      const chargesList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });

      setActivity(chargesList);
    } else {
      setActivity([]);
    }
  };


  const showEditMasterActivity = (row: IMasterActivity) => {
    if (row) {
      const infoPersonal: DataItem[] = [
        {
          title: <span className="text-left">Actividad</span>,
          value: row.name,
        },
        {
          title: <span className="text-left">Valor</span>,
          value: row.totalValue,
        },
        {
          title: <span className="text-left">Programa</span>,
          value: row.codProgramCode[0].name,
        },
        {
          title: (
            <span className="text-left">Descripción</span>
          ),
          value: row.description,
        },
      ];
    };
};
    

const tableColumns: ITableElement<IMasterActivity>[] = [
  {
      fieldName: "employment.worker.numberDocument",
      header: "Actividad",
      renderCell: (row) => {
        return <>{row.name}</>;
      },
    },
    {
      fieldName: "row.employment.worker",
      header: "Valor",
      renderCell: (row) => {
        return <>{row.totalValue}</>;
      },
    },
    {
      fieldName: "salaryIncrement.charge.name",
      header: "Programa",
      renderCell: (row) => {
        return <>{row.codProgramCode[0].name}</>;
      },
    },
    {
      fieldName: "salaryIncrement.numberActApproval",
      header: "Descripción",
      renderCell: (row) => {
        return <>{row.description}</>;
      },
    },
  ];

  const tableActions: ITableAction<IMasterActivity>[] = [
    {
        icon: "Edit",
        onClick: (row) => {
          showEditMasterActivity(row);
        },
    },
  ];


  return {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    formValues,
    showTable,
    activity,
    tableComponentRef,
    tableColumns,
    tableActions,
    
  }


}
