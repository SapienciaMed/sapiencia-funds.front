import { ITableElement } from "../../../../common/interfaces";
import { ILegalizationTable } from "../../../../common/interfaces/controlSelect.interface";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

export const columnsLegalization: ITableElement<ILegalizationTable>[] = [
  { fieldName: "program", header: "Programa fondo linea" },
  { fieldName: "Preselected", header: "No. Preseleccionados" },
  { fieldName: "places", header: "No. Cupos" },
  {
    fieldName: "Availableresources",
    header: "Recurso disponible",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.Availableresources)}</>;
    },
  },
  {
    fieldName: "Granted",
    header: "Otorgado",
    renderCell: (row) => {
      return <>{formaterNumberToCurrency(row.Granted)}</>;
    },
  },
  {
    fieldName: "Available",
    header: "Disponible",
    renderCell: (row) => {
      return (
        <>
          {formaterNumberToCurrency(
            Math.round(Number(row.Availableresources) - Number(row.Granted))
          )}
        </>
      );
    },
  },
  {
    fieldName: "porcentParticipacion",
    header: "%Paricipacion",
    renderCell: (row) => {
      const porcent = Math.round(
        (Number(row.Granted) / Number(row.Availableresources)) * 100
      );

      if (porcent == Infinity || porcent == undefined) {
        return <>0%</>;
      } else {
        if (porcent >= 90 && porcent < 98) {
          return (
            <>
              {" "}
              <div style={{ color: "yellow" }}>{porcent}%</div>
            </>
          );
        } else if (porcent >= 98 && porcent <= 100) {
          return (
            <>
              {" "}
              <div style={{ color: "red" }}> {porcent}%</div>
            </>
          );
        } else {
          return <>{porcent}%</>;
        }
      }
    },
  },
  { fieldName: "Legalized", header: "No.Legalizados" },
];
