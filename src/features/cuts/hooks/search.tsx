import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { ICut, ICutSearch } from "../../../common/interfaces/cut";
import { useCutApi } from "../services";
import { useNavigate } from "react-router-dom";
import { cutSchema, searchCutSchema } from "../../../common/schemas/cut-schema";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";

export default function useSearchCut(auth, authDelete, authEdit) {
  // Context
  const { setMessage, authorization } = useContext(AppContext);
  const [showTable, setshowTable] = useState(false);
  const tableComponentRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tempData, setTempData] = useState<ICut>();
  const navigate = useNavigate();
  const { deleteCut } = useCutApi();

  const resolver = useYupValidationResolver(searchCutSchema);

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
    reset,
    setValue,
    getValues,
  } = useForm<ICutSearch>({ resolver });

  //permisions
  useEffect(() => {
    const findPermission = authorization?.allowedActions?.findIndex(
      (i) => i == auth
    );
    if (findPermission <= 0) {
      setMessage({
        title: "¡Acceso no autorizado!",
        description: "Consulte con el admimistrador del sistema.",
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          navigate("/core");
          setMessage({});
        },
        background: true,
      });
      return;
    }

    setLoading(false);
  }, [auth, authorization]);

  //permissions
  const getActions = () => {
    const actions = [];

    const editPermissions = authorization?.allowedActions?.findIndex(
      (i) => i == authEdit
    );

    const deletePermissionPermissions =
      authorization?.allowedActions?.findIndex((i) => i == authDelete);

    if (editPermissions > 0) {
      actions.push({
        icon: "EditFill",
        onClick: (row) =>
          navigate("/fondos/administracion/cortes/form/" + row.id),
      });
    }

    if (deletePermissionPermissions > 0) {
      actions.push({
        icon: "DeleteFill",
        onClick: (row) => {
          handleModalDelete(row);
        },
      });
    }

    return actions;
  };

  function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const tableColumns: ITableElement<ICut>[] = [
    {
      fieldName: "row.cut.name",
      header: <div style={{ fontWeight: 400 }}>{"Nombre Corte"}</div>,
      renderCell: (row) => {
        return <>{row.name}</>;
      },
    },
    {
      fieldName: "row.cut.from",
      header: <div style={{ fontWeight: 400 }}>{"Fecha inicial"}</div>,
      renderCell: (row) => {
        return <>{formatDate(new Date(row.from))}</>;
      },
    },
    {
      fieldName: "row.cut.until",
      header: <div style={{ fontWeight: 400 }}>{"Fecha final"}</div>,
      renderCell: (row) => {
        return <>{formatDate(new Date(row.until))}</>;
      },
    },
  ];

  const tableActions: ITableAction<ICut>[] = getActions();

  const formValues = watch();

  const newElement = () => navigate("form");

  const onSubmit = handleSubmit(async (data: ICut) => {
    setshowTable(true);
    setTempData(data);
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  const handleModalDelete = (row) => {
    setMessage({
      title: "Eliminar",
      description: `¿Estás seguro de eliminar el corte, no podrás recuperar la configuración?`,
      show: true,
      cancelTitle: "Cancelar",
      OkTitle: "Aceptar",
      onOk: () => {
        confirmCutDelete(row);
      },
      background: true,
    });
  };

  const confirmCutDelete = async (data: ICut) => {
    const { data: dataResponse, operation } = data?.id
      ? await deleteCut(data.id)
      : null;

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  const handleModalSuccess = () => {
    setMessage({
      title: "Eliminar",
      description: `Información eliminada con éxito`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        if (tableComponentRef.current) {
          tableComponentRef.current.loadData(tempData);
        }
        setMessage({});
      },
      background: true,
    });
  };

  const handleModalError = (
    msg = `¡Ha ocurrido un error!`,
    navigateBoolean = true
  ) => {
    setMessage({
      title: "Error",
      description: msg,
      show: true,
      OkTitle: "Aceptar",
      onClose: () => {
        if (navigateBoolean) {
          navigate("/fondos/administracion/cortes/");
        }
        setMessage({});
      },
      background: true,
    });
  };

  return {
    register,
    control,
    formState,
    onSubmit,
    formValues,
    showTable,
    tableComponentRef,
    tableActions,
    newElement,
    setshowTable,
    reset,
    loading,
    setLoading,
    tableColumns,
    setValue,
    getValues,
  };
}
