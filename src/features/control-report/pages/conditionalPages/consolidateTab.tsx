import React, { memo } from "react";
import TableComponent from "../../../../common/components/table.component";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { consolidateHook } from "../../hooks/conditionalHooks/consolidateHook";
import { columnsConsolidados } from "../config-columns/columns-consolidados";
import Svgs from "../../../../public/images/icons/svgs";
import { ITableElement } from "../../../../common/interfaces";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

const ConsolidateTab = (data) => {
  const {
    tableComponentRef,
    urlGet,
    setPaginateData,
    tableActions,
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRendimientoFinancieros,
    downloadCollection,
    comunaList,
    TotalView,
    color,
  } = consolidateHook(data.data);

  const columnsConsolidados: ITableElement<any>[] = [
    {
      fieldName: "resourcePrioritization.communeId",
      header: "Comuna o corregimiento",
      renderCell: (row) => {
        return (
          <>
            {
              comunaList?.find(
                (obj) => obj.value == row.resourcePrioritization.communeId
              ).name
            }
          </>
        );
      },
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
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(
          row.consolidatedResourceAvailable
        );
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "consolidatedGranted",
      header: "Otorgado",
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(
          row.consolidatedGranted
        );
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "Available",
      header: "Disponible",
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(
          Math.round(
            Number(row.consolidatedResourceAvailable) -
              Number(row.consolidatedGranted)
          )
        );
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "porcentParticipacion",
      header: "%Participacion",
      renderCell: (row) => {
        const porcent = Math.round(
          (Number(row.consolidatedGranted) /
            Number(row.consolidatedResourceAvailable)) *
            100
        );

        if (porcent == Infinity || porcent == undefined || isNaN(porcent)) {
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
    {
      fieldName: "consolidatedLegalized",
      header: "Numero de legalizados",
    },
    {
      fieldName: "consolidatedFinancialReturns",
      header: "Rendimientos financieros",
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(
          row.consolidatedFinancialReturns
        );
        return <>{numeroConPuntos}</>;
      },
    },
  ];
  return (
    <>
      <div className="container-sections-forms ml-20px mr-20px">
        <TableComponent
          setPaginateData={setPaginateData}
          ref={tableComponentRef}
          url={urlGet}
          columns={columnsConsolidados}
          actions={tableActions}
          isShowModal={true}
          emptyMessage="Resultado en la búsqueda"
          descriptionModalNoResult="No se generó resultado en la búsqueda"
          titleMessageModalNoResult="Resultado de búsqueda"
        />
      </div>

      {TotalView && (
        <>
          {" "}
          <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
            <div
              className="bold mt-24px ml-16px mr-16px p-0"
              style={{ fontWeight: 500, fontSize: "29px", color: "#000000" }}
            >
              Totales
            </div>
            <div className="grid-form-4-container mb-24px">
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No. Preseleccionados"
                //register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={`${totalNoPreseleccionados}`}
                disabled
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No. Cupos"
                //register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(totalNoCupos)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Recurso disponible"
                //register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalRecursoDisponible))}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Otorgado"
                //register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalOtorgado))}
              />
            </div>

            <div className="grid-form-4-container mb-24px">
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Disponible"
                classNameLabel="text-black biggest text-required"
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalDisponible))}
              />

              <InputComponent
                idInput={"porcentPart"}
                className={`input-basic medium ${color}`}
                typeInput="text"
                label="%Participacion"
                classNameLabel="text-black biggest text-required "
                placeholder={""}
                disabled
                value={String(totalPorParticipacion) + "%"}
              />

              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No.Legalizados"
                classNameLabel="text-black biggest text-required"
                placeholder={""}
                disabled
                value={String(totalNoLegalizados)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Rendimiento financieros"
                //register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(
                  formaterNumberToCurrency(totalRendimientoFinancieros)
                )}
              />
            </div>
          </div>
          <div
            style={{
              height: "1px",
              margin: "0 20px",
              backgroundColor: "#e0e0e0",
            }}
          ></div>
          <div className="button-save-container-display mr-24px">
            <ButtonComponent
              value={
                <>
                  <div className="container-buttonText">
                    <span>Descargar</span>
                    <Svgs svg="excel" width={23.593} height={28.505} />
                  </div>
                </>
              }
              className="button-download large "
              action={downloadCollection}
            />
          </div>
        </>
      )}
    </>
  );
};

export default memo(ConsolidateTab);
