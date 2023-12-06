import React from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { ControlHook } from "../../hooks/conditionalHooks/ControlHook";
import TableComponent from "../../../../common/components/table.component";
import {
  columnsControl,
  columnsControlSubtotal,
} from "../config-columns/columns-control";
import Svgs from "../../../../public/images/icons/svgs";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const ControlTab = (data) => {
  const {
    tableComponentRef,
    urlControl,
    setPaginateData,
    totalRestantes,
    totalInicial,
    downloadCollection,
    TotalView,
    infoControlSubTotal,
  } = ControlHook(data.data);
  return (
    <>
      <div className="container-sections-forms mr-20px">
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
      {TotalView && (
        <>
          {TotalView && (
            <>
              <div className="container-sections-forms mt-24px  p-0">
                <div
                  className="bold mt-24px mb-24px mr-16px p-0"
                  style={{
                    fontWeight: 500,
                    fontSize: "29px",
                    color: "#000000",
                  }}
                >
                  Subtotales
                </div>
                <div className="spc-common-table">
                  <DataTable
                    value={infoControlSubTotal}
                    showGridlines
                    tableStyle={{
                      fontSize: "14px",
                      minWidth: "50rem",
                      fontWeight: "500",
                      marginTop: "24px",
                      marginLeft: "16px",
                      marginRight: "16px",
                    }}
                    emptyMessage={"No se generó resultado en la búsqueda"}
                  >
                    <Column
                      field="comuna"
                      header="ID comuna"
                      style={{ fontSize: "14px", fontWeight: "400" }}
                    ></Column>
                    <Column
                      field="recursoInicial"
                      header="Recurso inicial"
                      style={{ fontSize: "14px", fontWeight: "400" }}
                    ></Column>
                    <Column
                      field="restante"
                      header="Restante"
                      style={{ fontSize: "14px", fontWeight: "400" }}
                    ></Column>
                  </DataTable>
                </div>
              </div>
            </>
          )}
          <div className="container-sections-forms mt-24px p-0">
            <div
              className="bold mt-24px mr-16px mb-24px p-0"
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
                classNameLabel="text-black biggest"
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalInicial))}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Restantes"
                classNameLabel="text-black biggest"
                placeholder={""}
                disabled
                value={String(formaterNumberToCurrency(totalRestantes))}
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

export default ControlTab;
