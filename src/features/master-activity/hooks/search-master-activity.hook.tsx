import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {IMasterActivityFilter, IMasterActivity} from "../../../common/interfaces/funds.interfaces";
import { IDropdownProps } from "../../../common/interfaces/select.interface";


import { AppContext } from "../../../common/contexts/app.context";


export default function useSearchMasterHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  //const { getCharges } = usePayrollService();

  //states
  const [showTable, setshowTable] = useState(false);
  const [charges, setCharges] = useState<IDropdownProps[]>([]);

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

const onSubmit = handleSubmit(async (data: IMasterActivityFilter) => {
  setshowTable(true);

  if (tableComponentRef.current) {
    tableComponentRef.current.loadData(data);
  }
});

  //variables
const tableColumns: ITableElement<IMasterActivity>[] = [
  {
      fieldName: "employment.worker.numberDocument",
      header: "Actividad",
      renderCell: (row) => {
        return <>{""}</>;
      },
    },
    {
      fieldName: "row.employment.worker",
      header: "Valor",
      renderCell: (row) => {
        return <>{}</>;
      },
    },
    {
      fieldName: "salaryIncrement.charge.name",
      header: "Programa",
      renderCell: (row) => {
        return <>{""}</>;
      },
    },
    {
      fieldName: "salaryIncrement.numberActApproval",
      header: "Descripción",
      renderCell: (row) => {
        return <>{""}</>;
      },
    },
  ];

  const tableActions: ITableAction<IMasterActivity>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        navigate(`../edit/${""}`);
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
    charges,
    
  }


}