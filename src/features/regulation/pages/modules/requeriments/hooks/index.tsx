import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../../../../common/contexts/app.context";
import { useGenericListService } from "../../../../../../common/hooks/generic-list-service.hook";
import useYupValidationResolver from "../../../../../../common/hooks/form-validator.hook";
import { createRequeriment } from "../../../../../../common/schemas/requeriments-schema";
import { useRequerimentsApi } from "../../../../service/requeriments";
import { useNavigate } from "react-router-dom";
import { IRequeriments } from "../../../../../../common/interfaces/regulation";
import { useForm } from "react-hook-form";
import { EResponseCodes } from "../../../../../../common/constants/api.enum";
import {
  ITableAction,
  ITableElement,
} from "../../../../../../common/interfaces/table.interfaces";
import SwitchComponent from "../../../../../../common/components/Form/switch.component";

const useRequerimentsHook = () => {
  const { setMessage, authorization } = useContext(AppContext);
  const { getListByGrouper } = useGenericListService();
  const resolver = useYupValidationResolver(createRequeriment);
  const { createRequerimentAction, editRequeriment, deleteRequeriment } =
    useRequerimentsApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const tableComponentRef = useRef(null);
  const codReglament = localStorage.getItem("codReglament");

  const {
    handleSubmit,
    register,
    control: control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IRequeriments>({
    resolver,
  });

  useEffect(() => {
    if (!codReglament) return;
    const buildData = {
      codReglament: codReglament,
    };
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(buildData);
    }
  }, []);

  const onsubmitCreate = handleSubmit(async (data: IRequeriments) => {
    if (!codReglament)
      return handleModalError(
        "ocurrio un error inesperado, intente mas tarde por favor",
        false
      );
    const buildData = { ...data, codReglament: codReglament };
    const { data: dataResponse, operation } = await createRequerimentAction(
      buildData
    );
    if (operation.code === EResponseCodes.OK) {
      if (!codReglament) return;
      const buildData = {
        codReglament: codReglament,
      };
      if (tableComponentRef.current) {
        tableComponentRef.current.loadData(buildData);
      }
    } else {
      handleModalError(operation.message, false);
    }
  });

  const handleModalError = (
    msg = `¡Ha ocurrido un error!`,
    navigateBoolean = true
  ) => {
    setMessage({
      title: "Error",
      description: msg,
      show: true,
      OkTitle: "cerrar",
      background: true,
    });
  };

  const updateRequeriment = async (id: number, data: IRequeriments) => {
    const buildData = { ...data, active: data.active ? false : true };
    const { data: dataResponse, operation } = await editRequeriment(
      id,
      buildData
    );
    if (operation.code === EResponseCodes.OK) {
    } else {
      handleModalError(operation.message, false);
    }
  };

  const deleteRequerimentAction = async (id: number) => {
    const { data: dataResponse, operation } = await deleteRequeriment(id);
    if (operation.code === EResponseCodes.OK) {
    } else {
      handleModalError(operation.message, false);
    }
  };

  const tableColumns: ITableElement<IRequeriments>[] = [
    {
      fieldName: "row.requeriment.active",
      header: "Activo",
      renderCell: (row) => {
        setValue("active_update", row.active);
        return (
          <SwitchComponent
            idInput={"active_update"}
            control={control}
            size="small"
            className="select-basic select-disabled-list input-size"
            onChange={() => updateRequeriment(row.id, row)}
          />
        );
      },
    },
    {
      fieldName: "row.requeriment.percent",
      header: "Porcentaje",
      renderCell: (row) => {
        return <>{row.percent}%</>;
      },
    },
    {
      fieldName: "row.requeriment.description",
      header: "Descripcion",
      renderCell: (row) => {
        return <>{row.description}</>;
      },
    },
  ];

  const tableActions: ITableAction<IRequeriments>[] = [
    {
      icon: "Delete",
      onClick: (row) => deleteRequerimentAction(row.id),
    },
  ];

  return {
    control,
    errors,
    register,
    setValue,
    handleSubmit,
    onsubmitCreate,
    loading,
    getValues,
    watch,
    tableActions,
    tableColumns,
    tableComponentRef,
  };
};

export default useRequerimentsHook;