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
import useCrudService from "../../../common/hooks/crud-service.hook";
import CreateAbsorptionPercentage from "../../absorption-percentage/forms/modals/CreateAbsorptionPercentageModal";
import EditAbsorptionPercentageModal from "../../absorption-percentage/forms/modals/EditAbsorptionPercentageModal";
import { useGetAllPeriodsHook } from "../../absorption-percentage/hooks/getAllPeriodsHook";
import useBudgetApi from "../../budget-convocation/hooks/budget-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";

export const useConsultFinancialMonitoring = () => {
  const urlGet = `${urlApiFunds}/api/v1/absorption-percentage/get-all-paginated`;
  const { getbudget } = useBudgetApi();
  const [budgetList, setbudgetList] = useState([]);

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

  // carga combos
  useEffect(() => {
    getbudget().then((response) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setbudgetList(
          response.data.map((item) => ({
            name: item.id_comuna,
            value: item.id_comuna,
          }))
        );
      }
    });
  }, []);

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
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    downloadCollection,
    urlGet,
    validateActionAccess,
    width,
    periodsData,
    budgetList,
  };
};
