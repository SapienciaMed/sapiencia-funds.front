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
    tableActions,
    control,
    errors,
    isValid,
    handleClean,
    setPaginateData,
    submitDisabled,
    register,
    handleChange,
  } = useConsultControlReport({
    columnsTable: true,
    listConfigColumns: {
      "1": columnsConsolidados,
      "2": columns123,
      "3": columns456,
      "4": columns456,
      "5": columns456,
      "6": columns456,
    },
  });
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
      tableActions={tableActions}
      control={control}
      errors={errors}
      isValid={isValid}
      handleClean={handleClean}
    />
  );
};

export default SearchBudgetPage;
