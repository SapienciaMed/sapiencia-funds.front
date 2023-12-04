import React, { useContext } from "react";
import BasicTableComponent from "../../../../common/components/basic-table.component";
import { LegalizationHook } from "../../hooks/conditionalHooks/LegalizationHook";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import TableComponent from "../../../../common/components/table.component";
import { columnsLegalization } from "../config-columns/columns-legalization";
import Svgs from "../../../../public/images/icons/svgs";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

const LegalizacionTab = (data) => {
  const {
    tableComponentRef,
    urlGetLegalization,
    tableActions,
    setPaginateData,
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    downloadCollection,
    TotalView,
  } = LegalizationHook(data.data);
  return (
    <>
      <div className="container-sections-forms ml-20px mr-20px">
        <TableComponent
          setPaginateData={setPaginateData}
          ref={tableComponentRef}
          url={urlGetLegalization}
          columns={columnsLegalization}
          actions={tableActions}
          isShowModal={true}
          emptyMessage="Resultado en la búsqueda"
          descriptionModalNoResult="No se generó resultado en la búsqueda"
          titleMessageModalNoResult="Resultado de búsqueda"
        />
      </div>

      {TotalView && (
        <>
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
            <div className="grid-form-3-container mb-24px">
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Disponible"
                //register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalDisponible))}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="%Participacion"
                //register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                //errors={errors}
                placeholder={""}
                disabled
                value={String(totalPorParticipacion)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No.Legalizados"
                //register={register}
                classNameLabel="text-black biggest text-required"
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

export default LegalizacionTab;
