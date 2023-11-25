import React, { memo } from "react";
import TableComponent from "../../../../common/components/table.component";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { consolidateHook } from "../../hooks/conditionalHooks/consolidateHook";
import { columnsConsolidados } from "../config-columns/columns-consolidados";
const ConsolidateTab = (data) => {
  const {
    urlGet,
    tableComponentRef,
    tableColumns,
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
  } = consolidateHook(data);
  return (
    <>
      <div className="container-sections-forms ml-20px mr-20px">
        <TableComponent
          setPaginateData={setPaginateData}
          ref={tableComponentRef}
          url={urlGet}
          columns={tableColumns}
          actions={tableActions}
          isShowModal={true}
          emptyMessage="Resultado en la búsqueda"
          descriptionModalNoResult="No se generó resultado en la búsqueda"
          titleMessageModalNoResult="Resultado de búsqueda"
        />
      </div>{" "}
      <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
        {" "}
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
            value={String(totalRecursoDisponible)}
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
            value={String(totalOtorgado)}
          />
        </div>
        <div className="grid-form-4-container mb-24px">
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
            value={String(totalDisponible)}
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
            value={String(totalRendimientoFinancieros)}
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
        <ButtonComponent value="Cerrar" className="button-save big" />
      </div>
    </>
  );
};

export default memo(ConsolidateTab);
