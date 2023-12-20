import { IPeriodsAbsorption } from "../../../../common/interfaces/PeriodsAbsorption.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

export const tableColumns: ITableElement<IPeriodsAbsorption>[] = [
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
    fieldName: "sceneryPercentage1",
    header: "Fiducia",
    renderCell: (row) => {
      return <>{`$ ${row.sceneryPercentage1}`}</>;
    },
  },
  {
    fieldName: "sceneryPercentage2",
    header: "Fecha de actualización",
    renderCell: (row) => {
      return <>{`${row.sceneryPercentage2}`}</>;
    },
  },
  {
    fieldName: "sceneryPercentage3",
    header: "Ordern",
    renderCell: (row) => {
      return <>{`${row.sceneryPercentage3}`}</>;
    },
  },
];
