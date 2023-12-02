import { ITableElement } from "../../../../common/interfaces";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

export const columnsControl: ITableElement<any>[] = [
  { fieldName: "comuna", header: "ID comuna" },
  {
    fieldName: "contrato",
    header: "Contrato",
  },
  {
    fieldName: "recursoInicial",
    header: "Recurso inicial",
    renderCell: (row) => {
      return (
        <>{formaterNumberToCurrency(row.recursoInicial).replace("$", "")}</>
      );
    },
  },
  {
    fieldName: "restante",
    header: "Restante",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.restante).replace("$", "")}</>;
    },
  },
];

export const columnsControlSubtotal: ITableElement<any>[] = [
  { fieldName: "comuna", header: "ID comuna" },
  {
    fieldName: "recursoInicial",
    header: "Recurso inicial",
    renderCell: (row) => {
      return (
        <>{formaterNumberToCurrency(row.recursoInicial).replace("$", "")}</>
      );
    },
  },
  {
    fieldName: "restante",
    header: "Restante",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.restante).replace("$", "")}</>;
    },
  },
];
