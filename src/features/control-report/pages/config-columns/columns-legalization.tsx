import { ITableElement } from "../../../../common/interfaces";
import { ILegalizationTable } from "../../../../common/interfaces/controlSelect.interface";

export const columnsLegalization: ITableElement<ILegalizationTable>[] = [
  { fieldName: "program", header: "Programa fondo linea" },
  { fieldName: "Preselected", header: "No. Preseleccionados" },
  { fieldName: "places", header: "No. Cupos" },
  { fieldName: "Availableresources", header: "Recurso disponible" },
  { fieldName: "Granted", header: "Otorgado" },
  {
    fieldName: "Available",
    header: "Disponible",
    renderCell: (row) => {
      return (
        <>{Math.round(Number(row.Availableresources) - Number(row.Granted))}</>
      );
    },
  },
  {
    fieldName: "porcentParticipacion",
    header: "%Paricipacion",
    renderCell: (row) => {
      return (
        <>
          {Math.round(
            (Number(row.Granted) / Number(row.Availableresources)) * 100
          )}{" "}
          %
        </>
      );
    },
  },
  { fieldName: "Legalized", header: "No.Legalizados" },
];
