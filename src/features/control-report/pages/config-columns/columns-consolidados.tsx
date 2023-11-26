import { ITableElement } from "../../../../common/interfaces/config-columns";

export const columnsConsolidados: ITableElement<any>[] = [
  {
    fieldName: "commune",
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
  },
  {
    fieldName: "porcentParticipacion",
    header: "%Participacion",
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
