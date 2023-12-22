import { ICallLegalResfilters } from "../../../../common/interfaces/LegalAuditFunds";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

export const tableColumns: ITableElement<ICallLegalResfilters>[] = [
  {
    fieldName: "communeFundId",
    header: "ID comuna",
  },
  {
    fieldName: "resource",
    header: "Recurso",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.resource)}</>;
    },
  },
  {
    fieldName: "fiduciaryName",
    header: "Fiducia",
  },
  {
    fieldName: "",
    header: "Fecha de actualización",
    renderCell: () => <>25/08/2023</>,
  },
  {
    fieldName: "order",
    header: "Orden",
  },
];
