import { ITableElement } from "../../../../common/interfaces/config-columns";

export interface IFurniture {
  plate: string;
  description: string;
  acquisitionDate: string;
  equipmentStatus: number;
  userIdentification: string;
  fullName: string;
  area: number;
  model: string;
  brand: string;
  measure: string;
  activeOwner: number;
  observation: string;
  clerk: number;
}

export const columns456: ITableElement<IFurniture>[] = [
  {
    fieldName: "area 456",
    header: "Área 456",
  },
];
