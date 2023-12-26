import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";

import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { useWidth } from "../../../common/hooks/use-width";
import { useGetAllPeriodsHook } from "./getAllPeriodsHook";
import {
  ICallPeriodsResfilters,
  IPeriodsAbsorption,
} from "../../../common/interfaces/PeriodsAbsorption.interface";
import CreateAbsorptionPercentage from "../forms/modals/CreateAbsorptionPercentageModal";
import { filtersPeriodsAbsorptionSchema } from "../../../common/schemas/PeriodsAbsorption.shema";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import EditAbsorptionPercentageModal from "../forms/modals/EditAbsorptionPercentageModal";
import useCrudService from "../../../common/hooks/crud-service.hook";

export const useConsultAbsorptionPercentage = () => {
  const urlGet = `${urlApiFunds}/api/v1/absorption-percentage/get-all-paginated`;
  const navigate = useNavigate();
  const { deleted } = useCrudService(urlApiFunds);
  const { width } = useWidth();
  const { validateActionAccess, authorization } = useContext(AppContext);
  const tableComponentRef = useRef(null);
  const { periods: periodsData } = useGetAllPeriodsHook();
  const [showFooterActions, setShowFooterActions] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { setMessage } = useContext(AppContext);
  const resolver = useYupValidationResolver(filtersPeriodsAbsorptionSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  const [periods] = watch(["announcementId"]);
  const [reloadTable, setReloadTable] = useState(false);

  const tableActions: ITableAction<IPeriodsAbsorption>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        setMessage({
          show: true,
          title: "Editar ítem",
          description: (
            <EditAbsorptionPercentageModal
              announcementId={periods}
              row={row}
              reloadTable={handleReloadTable}
            />
          ),
          background: true,
          size: "items",
          items: true,
        });
      },
      hide: !validateActionAccess("FONDOS_PORCENTAJE_ABSORCION_EDITAR"),
    },

    {
      icon: "Delete",
      onClick: (row) => {
        handleDelete(row);
      },
      hide: !validateActionAccess("FONDOS_PORCENTAJE_ABSORCION_ELIMINAR"),
    },
  ];

  const onSubmit = handleSubmit(async (filters: ICallPeriodsResfilters, ev) => {
    try {
      ev.preventDefault();
      setTableView(true);
      await tableComponentRef.current?.loadData({
        ...filters,
      });
    } catch (err) {
      console.log(err);
      handleClean();
    }
  });

  const handleReloadTable = useCallback(
    async (filters: ICallPeriodsResfilters) => {
      setReloadTable((prev) => !prev);
      await tableComponentRef.current?.loadData({
        ...filters,
      });
    },
    []
  );

  const downloadCollection = useCallback(() => {
    const token = localStorage.getItem("token");
    const { page, perPage } = paginateData;
    const url = new URL(
      `${urlApiFunds}/api/v1/absorption-percentage/generate-xlsx`
    );
    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    if (periods) {
      params.append("announcementId", periods);
    }
    params.append("permissions", authorization.encryptedAccess);
    params.append("authorization", token);
    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [paginateData, periods]);

  const handleDelete = (row) => {
    setMessage({
      title: "Porcentaje de absorción",
      description: "¿Estás segur@ de eliminar el ítem?",
      show: true,
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: async () => {
        setMessage({ show: false });
        await deleteItem(row);
        await handleReloadTable({
          announcementId: periods,
        });
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  };

  const deleteItem = async (row) => {
    try {
      const endpoint = `/api/v1/absorption-percentage/${row.id}/delete-by-id`;
      await deleted<null>(endpoint);
      setMessage({
        title: "Porcentaje de absorción",
        description: "Ítem eliminado exitosamente",
        show: true,
        OkTitle: "Cerrar",
        onOk: async () => {
          setMessage({ show: false });
        },
        background: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAggItem = async (ev) => {
    try {
      ev.preventDefault();
      setMessage({
        show: true,
        title: "Agregar ítem",
        description: (
          <CreateAbsorptionPercentage
            announcementId={periods}
            reloadTable={handleReloadTable}
          />
        ),
        background: true,
        size: "items",
        items: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  useEffect(() => {
    if (periods) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [periods]);

  return {
    setShowFooterActions,
    showFooterActions,
    errors,
    control,
    isValid,
    register,
    onSubmit,
    tableView,
    handleClean,
    tableActions,
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    downloadCollection,
    urlGet,
    validateActionAccess,
    width,
    handleAggItem,
    periodsData,
  };
};
