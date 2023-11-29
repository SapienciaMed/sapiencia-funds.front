import { ITableElement } from "../../../../common/interfaces";

export const columnsControl: ITableElement<any>[] = [
  { fieldName: "comuna", header: "ID comuna" },
  {
    fieldName: "",
    header: "Comuna",
    renderCell: (row) => {
      return <>0</>;
    },
  },
  { fieldName: "recursoInicial", header: "Recurso inicial" },
  { fieldName: "restante", header: "Restante" },
];
