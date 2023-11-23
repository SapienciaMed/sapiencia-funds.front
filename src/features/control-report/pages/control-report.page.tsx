import { ManagePropertyForm } from "../forms/ControlReportForm";
import { useConsultControlReport } from "../hooks/controlreport";
import { columnsConsolidados } from "./config-columns/columns-consolidados";
import { columns123 } from "./config-columns/columns-estrato-123";
import { columns456 } from "./config-columns/columns-estrato-456";

const SearchBudgetPage = () => {
  const {
    urlGet,
    tableComponentRef,
    tableView,
    onSubmit,
    tableColumns,

    control,
    errors,
    isValid,
    handleClean,
    setPaginateData,
    submitDisabled,
    register,
    handleChange,
    updateOrSaveData,
    tableActions,
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRendimientoFinancieros,
  } = useConsultControlReport();
  return (
    <ManagePropertyForm
      register={register}
      handleChange={handleChange}
      // equipmentStatusData={equipmentStatusData}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      urlGet={urlGet}
      tableComponentRef={tableComponentRef}
      tableView={tableView}
      onSubmit={onSubmit}
      tableColumns={tableColumns}
      control={control}
      errors={errors}
      isValid={isValid}
      handleClean={handleClean}
      updateOrSaveData={updateOrSaveData}
      tableActions={tableActions}
      totalNoPreseleccionados={totalNoPreseleccionados}
      totalOtorgado={totalOtorgado}
      totalNoCupos={totalNoCupos}
      totalRecursoDisponible={totalRecursoDisponible}
      totalDisponible={totalDisponible}
      totalPorParticipacion={totalPorParticipacion}
      totalNoLegalizados={totalNoLegalizados}
      totalRendimientoFinancieros={totalRendimientoFinancieros}
    />
  );
};

export default SearchBudgetPage;
