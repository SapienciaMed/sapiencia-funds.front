import { ITableElement } from "../../../../common/interfaces";

export const columnsControl: ITableElement<any>[] = [
  { fieldName: "comuna", header: "ID comuna" },
  {
    fieldName: "contrato",
    header: "Contrato",
  },
  { fieldName: "recursoInicial", header: "Recurso inicial" },
  { fieldName: "restante", header: "Restante" },
];
