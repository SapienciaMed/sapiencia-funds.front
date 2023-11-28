import { ITableElement } from "../../../../common/interfaces";
import { ILegalizationTable } from "../../../../common/interfaces/controlSelect.interface";

export const columnsLegalization: ITableElement<ILegalizationTable>[] = [
  { fieldName: "program", header: "Programa fondo linea" },
  { fieldName: "Preselected", header: "No. Preseleccionados" },
  { fieldName: "places", header: "No. Cupos" },
  { fieldName: "Availableresources", header: "Recurso disponible" },
  { fieldName: "Granted", header: "Otorgado" },
  // { fieldName: "Available", header: "Disponible" },
  // { fieldName: "porcentParticipacion", header: "%Paricipacion" },
  { fieldName: "Legalized", header: "No.Legalizados" },
];
