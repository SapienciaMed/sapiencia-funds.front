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

export const useConsultAbsorptionPercentage = () => {
  const urlGet = `${urlApiFunds}/api/v1/absorption-percentage/get-all-paginated`;
  const navigate = useNavigate();
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

  const tableActions: ITableAction<IPeriodsAbsorption>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        setMessage({
          show: true,
          title: "Editar ítem",
          description: (
            <EditAbsorptionPercentageModal announcementId={periods} row={row} />
          ),
          background: true,
          size: "items",
          items: true,
        });
      },
    },

    {
      icon: "Delete",
      onClick: (row) => {},
    },
  ];

  const onSubmit = handleSubmit(async (filters: ICallPeriodsResfilters, ev) => {
    try {
      ev.preventDefault();
      setTableView(true);
      const resp = await tableComponentRef.current?.loadData({
        ...filters,
      });
    } catch (err) {
      console.log(err);
      handleClean();
    }
  });

  const downloadCollection = useCallback(() => {
    const token = localStorage.getItem("token");
    const { page, perPage } = paginateData;

    const params = new URLSearchParams();
    params.append("page", page + 1);
    params.append("perPage", perPage);
    params.append("authorization", token);
    params.append("permissions", authorization.encryptedAccess);
    if (periods) {
      params.append("convocatoria", periods);
    }
  }, [paginateData]);

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const handleAggItem = (ev) => {
    try {
      ev.preventDefault();

      setMessage({
        show: true,
        title: "Agregar ítem",
        description: <CreateAbsorptionPercentage announcementId={periods} />,
        background: true,
        size: "items",
        items: true,
      });
    } catch (err) {
      console.log(err);
    }
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
