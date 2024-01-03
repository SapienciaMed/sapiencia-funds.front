import { memo } from "react";
import FinancialMonitoringForm from "../forms/consultFinancialMonitoring/FinancialMonitoringForm";
import { useConsultFinancialMonitoring } from "../hooks/consultFinancialMonitoring";

const ConsultFinancialMonitoring = () => {
  const {
    errors,
    control,
    isValid,
    onSubmit,
    tableView,
    handleClean,
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    downloadCollection,
    urlGet,
    validateActionAccess,
    setShowFooterActions,
    showFooterActions,
    periodsData,
    budgetList,
  } = useConsultFinancialMonitoring();
  return (
    <FinancialMonitoringForm
      showFooterActions={showFooterActions}
      setShowFooterActions={setShowFooterActions}
      validateActionAccess={validateActionAccess}
      errors={errors}
      control={control}
      isValid={isValid}
      onSubmit={onSubmit}
      tableView={tableView}
      handleClean={handleClean}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      tableComponentRef={tableComponentRef}
      downloadCollection={downloadCollection}
      periodsData={periodsData}
      urlGet={urlGet}
      budgetList={budgetList}
    />
  );
};

export default memo(ConsultFinancialMonitoring);
