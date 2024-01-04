import { memo } from "react";
import AbsorptionPercentageForm from "../forms/consultAbsorptionPercentage/AbsorptionPercentageForm";
import { useConsultAbsorptionPercentage } from "../hooks/consultAbsorptionPercentage";

const ConsultAbsorptionPercentage = () => {
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
    handleAggItem,
    periodsData,
  } = useConsultAbsorptionPercentage();
  return (
    <AbsorptionPercentageForm
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
      setPaginateData={setPaginateData}
      tableComponentRef={tableComponentRef}
      downloadCollection={downloadCollection}
      width={width}
      handleAggItem={handleAggItem}
      periodsData={periodsData}
      urlGet={urlGet}
    />
  );
};

export default memo(ConsultAbsorptionPercentage);
