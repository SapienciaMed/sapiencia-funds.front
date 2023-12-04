import { ITableElement } from "../../../../common/interfaces/config-columns";

export const columnsStratum456: ITableElement<any>[] = [
  {
    fieldName: "resourcePrioritization.communeId",
    header: "Comuna o corregimiento",
  },
  {
    fieldName: "resourceAvailable",
    header: "Recurso Disponible",
  },
  {
    fieldName: "granted",
    header: "Otorgado",
  },
  {
    fieldName: "Available",
    header: "Disponible",
    renderCell: (row) => {
      return (
        <>{Math.round(Number(row.resourceAvailable) - Number(row.granted))}</>
      );
    },
  },
  {
    fieldName: "porcentParticipacion",
    header: "%Participacion",
    renderCell: (row) => {
      return (
        <>
          {Math.round(
            (Number(row.granted) / Number(row.resourceAvailable)) * 100
          )}{" "}
          %
        </>
      );
    },
  },
  {
    fieldName: "legalized",
    header: "No.Legalizados",
  },
];
