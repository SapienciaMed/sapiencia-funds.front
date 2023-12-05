import React from "react";
import TableComponent from "../../../../common/components/table.component";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { stratum456Hook } from "../../hooks/conditionalHooks/stratum456";
import { ITableElement } from "../../../../common/interfaces";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";
import Svgs from "../../../../public/images/icons/svgs";

const Stratum456Tab = (data) => {
  const {
    setPaginateData,
    tableComponentRef,
    urlGet,
    tableActions,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRecursoDisponible,
    totalOtorgado,
    comunaList,
    TotalView,
    downloadCollection,
    color,
  } = stratum456Hook(data.data);
  console.log(totalPorParticipacion);
  const columnsStratum456: ITableElement<any>[] = [
    {
      fieldName: "resourcePrioritization.communeId",
      header: "Comuna o corregimiento",
      renderCell: (row) => {
        // Intenta encontrar el objeto
        const foundObj = comunaList?.find(
          (obj) => obj.value == row.resourcePrioritization.communeId
        );
    
        // Verifica si el objeto fue encontrado antes de acceder a su propiedad 'name'
        if (foundObj) {
          return <>{foundObj.name}</>;
        }
    
        // Puedes retornar algo por defecto si el objeto no se encuentra
        return <>No encontrado</>;
      },
    },    
    {
      fieldName: "resourceAvailable",
      header: "Recurso Disponible",
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(row.resourceAvailable);
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "granted",
      header: "Otorgado",
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(row.granted).replace(
          "$",
          ""
        );
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "Available",
      header: "Disponible",
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(
          Math.round(Number(row.resourceAvailable) - Number(row.granted))
        );
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "porcentParticipacion",
      header: "%Participacion",
      renderCell: (row) => {
        const porcent = Math.round(
          (Number(row.granted) / Number(row.resourceAvailable)) * 100
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
    {
      fieldName: "legalized",
      header: "No.Legalizados",
    },
  ];

  console.log(urlGet);
  return (
    <>
      <div className="container-sections-forms  mr-20px">
        <TableComponent
          setPaginateData={setPaginateData}
          ref={tableComponentRef}
          url={urlGet}
          columns={columnsStratum456}
          actions={tableActions}
          isShowModal={true}
          emptyMessage="Resultado en la búsqueda"
          descriptionModalNoResult="No se generó resultado en la búsqueda"
          titleMessageModalNoResult="Resultado de búsqueda"
        />
      </div>

      {TotalView && (
        <>
          <div className="container-sections-forms mt-24px  p-0">
            <div
              className="bold mt-24px mr-16px p-0"
              style={{ fontWeight: 500, fontSize: "29px", color: "#000000" }}
            >
              Totales
            </div>
            <div className="grid-form-3-container mb-24px">
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Recurso disponible"
                //register={register}
                classNameLabel="text-black biggest"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(
                  formaterNumberToCurrency(totalRecursoDisponible).replace(
                    "$",
                    ""
                  )
                )}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Otorgado"
                //register={register}
                classNameLabel="text-black biggest"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalOtorgado))}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Disponible"
                //register={register}
                classNameLabel="text-black biggest"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalDisponible))}
              />
            </div>
            <div className="grid-form-2-container mb-24px">
              <InputComponent
                idInput={"tQuantity1"}
                className={`input-basic medium ${color}`}
                typeInput="text"
                label="%Participacion"
                //register={register}
                classNameLabel="text-black biggest"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(totalPorParticipacion) + "%"}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No.Legalizados"
                //register={register}
                classNameLabel="text-black biggest"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(totalNoLegalizados)}
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

export default Stratum456Tab;
