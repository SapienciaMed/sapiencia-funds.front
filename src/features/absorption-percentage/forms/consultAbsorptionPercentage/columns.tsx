import { IPeriodsAbsorption } from "../../../../common/interfaces/PeriodsAbsorption.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

export const tableColumns: ITableElement<IPeriodsAbsorption>[] = [
  {
    fieldName: "communeFundId",
    header: "Fondo comuna",
  },

  {
    fieldName: "resource",
    header: "Recurso",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.resource)}</>;
    },
  },
  {
    fieldName: "sceneryPercentage1",
    header: "% 1",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.sceneryPercentage1)}</>;
    },
  },
  {
    fieldName: "sceneryPercentage2",
    header: "% 2",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.sceneryPercentage2)}</>;
    },
  },
  {
    fieldName: "sceneryPercentage3",
    header: "% 3",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.sceneryPercentage3)}</>;
    },
  },
  {
    fieldName: "sceneryValue1",
    header: "Valor 1",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.sceneryValue1)}</>;
    },
  },
  {
    fieldName: "sceneryValue2",
    header: "Valor 2",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.sceneryValue2)}</>;
    },
  },
  {
    fieldName: "sceneryValue3",
    header: "Valor 3",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.sceneryValue3)}</>;
    },
  },
];
