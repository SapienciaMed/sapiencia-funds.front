import { memo } from "react";
import { useConsultLegalAuditFunds } from "../hooks/consultLegalAuditFunds";
import LegalAuditFundsForm from "../forms/consultLegalAuditFunds/LegalAuditFundsForm";

const ConsultLegalAuditFundsRoute = () => {
  const {
    errors,
    control,
    isValid,
    onSubmit,
    register,
    tableView,
    handleClean,
    tableActions,
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    downloadCollection,
    validateActionAccess,
    setShowFooterActions,
    showFooterActions,
    periodsData,
    legalAuditData,
  } = useConsultLegalAuditFunds();
  return (
    <LegalAuditFundsForm
      showFooterActions={showFooterActions}
      setShowFooterActions={setShowFooterActions}
      validateActionAccess={validateActionAccess}
      errors={errors}
      control={control}
      isValid={isValid}
      onSubmit={onSubmit}
      tableView={tableView}
      handleClean={handleClean}
      tableActions={tableActions}
      submitDisabled={submitDisabled}
      tableComponentRef={tableComponentRef}
      downloadCollection={downloadCollection}
      periodsData={periodsData}
      legalAuditData={legalAuditData}
    />
  );
};

export default memo(ConsultLegalAuditFundsRoute);
