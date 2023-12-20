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
    urlGet,
    validateActionAccess,
    setShowFooterActions,
    showFooterActions,
    width,
    periodsData,
  } = useConsultLegalAuditFunds();
  return (
    <LegalAuditFundsForm
      showFooterActions={showFooterActions}
      setShowFooterActions={setShowFooterActions}
      //   validateActionAccess={validateActionAccess}
      errors={errors}
      control={control}
      isValid={isValid}
      onSubmit={onSubmit}
      register={register}
      tableView={tableView}
      handleClean={handleClean}
      tableActions={tableActions}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      tableComponentRef={tableComponentRef}
      downloadCollection={downloadCollection}
      width={width}
      periodsData={periodsData}
      urlGet={urlGet}
    />
  );
};

export default memo(ConsultLegalAuditFundsRoute);
