import { ITableElement } from "../../../../common/interfaces/config-columns";

export const columnsConsolidados: ITableElement<any>[] = [
  {
    fieldName: "resourcePrioritization.communeId",
    header: "Comuna o corregimiento",
  },
  {
    fieldName: "consolidatedPreselected",
    header: "No.Preseleccionados",
  },
  {
    fieldName: "places",
    header: "No.Cupos",
  },
  {
    fieldName: "consolidatedResourceAvailable",
    header: "Recurso Disponible",
  },
  {
    fieldName: "consolidatedGranted",
    header: "Otorgado",
  },
  {
    fieldName: "Available",
    header: "Disponible",
    renderCell: (row) => {
      return (
        <>
          {Math.round(
            Number(row.consolidatedResourceAvailable) -
              Number(row.consolidatedGranted)
          )}
        </>
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
            (Number(row.consolidatedGranted) /
              Number(row.consolidatedResourceAvailable)) *
              100
          )}{" "}
          %
        </>
      );
    },
  },
  {
    fieldName: "consolidatedLegalized",
    header: "Numero de legalizados",
  },
  {
    fieldName: "consolidatedFinancialReturns",
    header: "Rendimientos financieros",
  },
];
