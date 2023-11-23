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
    fieldName: "resourcePrioritization.places",
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
    fieldName: "consolidatedResourceAvailable - consolidatedGranted",
    header: "Disponible",
  },
  {
    fieldName: "",
    header: "%Participacion",
  },
  {
    fieldName: "consolidatedGranted",
    header: "Otorgado",
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
