import React from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { ControlHook } from "../../hooks/conditionalHooks/ControlHook";
import TableComponent from "../../../../common/components/table.component";
import { columnsControl } from "../config-columns/columns-control";
import Svgs from "../../../../public/images/icons/svgs";

const ControlTab = (data) => {
  const {
    tableComponentRef,
    urlControl,
    setPaginateData,
    totalRestantes,
    totalInicial,
    downloadCollection,
  } = ControlHook(data.data);
  return (
    <>
      <div className="container-sections-forms ml-20px mr-20px">
        <TableComponent
          setPaginateData={setPaginateData}
          ref={tableComponentRef}
          url={urlControl}
          columns={columnsControl}
          isShowModal={true}
          emptyMessage="Resultado en la búsqueda"
          descriptionModalNoResult="No se generó resultado en la búsqueda"
          titleMessageModalNoResult="Resultado de búsqueda"
        />
      </div>

      {/* <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
        <div
          className="bold mt-24px ml-16px mr-16px p-0"
          style={{ fontWeight: 500, fontSize: "29px", color: "#000000" }}
        >
          subtotales
        </div>
        <div className="grid-form-3-container mb-24px">
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="No. Preseleccionados"
            //register={register}
            classNameLabel="text-black biggest text-required"
            //direction={EDirection.column}
            //errors={errors}
            // placeholder={`${totalNoPreseleccionados}`}
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
            // value={String(totalNoCupos)}
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
            // value={String(totalRecursoDisponible)}
          />
        </div>
      </div> */}

      <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
        <div
          className="bold mt-24px ml-16px mr-16px p-0"
          style={{ fontWeight: 500, fontSize: "29px", color: "#000000" }}
        >
          Totales
        </div>
        <div className="grid-form-2-container mb-24px">
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Inicial"
            classNameLabel="text-black biggest text-required"
            placeholder={""}
            disabled
            value={String(totalInicial)}
          />
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Restantes"
            classNameLabel="text-black biggest text-required"
            placeholder={""}
            disabled
            value={String(totalRestantes)}
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
  );
};

export default ControlTab;
