import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";

import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { useWidth } from "../../../common/hooks/use-width";

import {
  ICallPeriodsResfilters,
  IPeriodsAbsorption,
} from "../../../common/interfaces/PeriodsAbsorption.interface";
import { filtersPeriodsAbsorptionSchema } from "../../../common/schemas/PeriodsAbsorption.shema";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import { useGetAllPeriodsHook } from "../../absorption-percentage/hooks/getAllPeriodsHook";
import EditLegalAuditFundsModal from "../forms/modals/EditLegalAuditFundsModal";
import { useGetCommuneFundByIdLegalHook } from "./getALlByAnnouncementIdHook";
import { ICallLegalResfilters } from "../../../common/interfaces/LegalAuditFunds";

export const useConsultLegalAuditFunds = () => {
  const { validateActionAccess, authorization } = useContext(AppContext);
  const tableComponentRef = useRef(null);
  const { periods: periodsData } = useGetAllPeriodsHook();
  const [showFooterActions, setShowFooterActions] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { setMessage } = useContext(AppContext);

  const { legalAuditData, getLegalAuditByAnnouncement } =
    useGetCommuneFundByIdLegalHook();

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
            <EditLegalAuditFundsModal
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
      hide: !validateActionAccess("FONDOS_LEGALIZADO_EDITAR"),
    },
  ];

  const onSubmit = handleSubmit(async (filters: ICallLegalResfilters, ev) => {
    try {
      ev.preventDefault();
      setTableView(true);
      getLegalAuditByAnnouncement(periods);
      await tableComponentRef.current?.loadData({
        ...filters,
      });
    } catch (err) {
      console.log(err);
      handleClean();
    }
  });

  const handleReloadTable = useCallback(
    async (filters: ICallLegalResfilters) => {
      setReloadTable((prev) => !prev);
      await tableComponentRef.current?.loadData(
        {
          ...filters,
        },
        getLegalAuditByAnnouncement(periods)
      );
      console.log("data*/**", legalAuditData);
    },
    []
  );

  const downloadCollection = useCallback(() => {
    const token = localStorage.getItem("token");
    const url = new URL(`${urlApiFunds}/api/v1/legalized/generate-xlsx`);
    const params = new URLSearchParams();
    if (periods) {
      params.append("announcementId", periods);
    }
    params.append("authorization", token);
    params.append("permissions", authorization.encryptedAccess);

    url.search = params.toString();
    window.open(url.toString(), "_blank");
  }, [paginateData, periods]);

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
    validateActionAccess,
    periodsData,
    legalAuditData,
  };
};
