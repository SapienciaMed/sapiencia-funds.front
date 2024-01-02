import { IPeriodsAbsorption } from "../../../../common/interfaces/PeriodsAbsorption.interface";
import { ITableElement } from "../../../../common/interfaces/table.interfaces";

export const tableColumns: ITableElement<IPeriodsAbsorption>[] = [
  {
    fieldName: "communeFundId",
    header: "Fondo comuna",
  },
];
