import { ITableElement } from "../../../../common/interfaces";
import { IControlPay } from "../../../../common/interfaces/control.report.interface";

export const columnsPay: ITableElement<any>[] = [
  {
    fieldName: "fondo",
    header: "Modalidad aspirante",
    renderCell: (row) => {
      return <>{row.fondo}</>;
    },
  },
  {
    fieldName: "PagareAprobado",
    header: "Aprobado",
    renderCell: (row) => {
      return <>{row.PagareAprobado}</>;
    },
  },
  {
    fieldName: "PagareEntregado",
    header: "Pagaré entregado",
    renderCell: (row) => {
      return <>{row.PagareEntregado}</>;
    },
  },
  {
    fieldName: "SinEntregarPagare",
    header: "Sin entregar",
    renderCell: (row) => {
      return <>{row.SinEntregarPagare}</>;
    },
  },
  {
    fieldName: "NoAplica",
    header: "No aplica",
    renderCell: (row) => {
      return <>{row.NoAplica}</>;
    },
  },
];
