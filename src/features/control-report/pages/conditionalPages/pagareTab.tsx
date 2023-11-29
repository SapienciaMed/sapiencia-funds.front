import React, { useState } from "react";
import TableComponent from "../../../../common/components/table.component";
import { ButtonComponent, InputComponent } from "../../../../common/components/Form";
import { usePagareHook } from "../../hooks/conditionalHooks/pagareHook";
import Svgs from "../../../../public/images/icons/svgs";

const PagareTab = (data, tableComponent) => {
  const {
    tableColumns,
    downloadCollection,
  } = usePagareHook(data, );

  const [sendingReportXlsx, setSendingReportXlsx] = useState(false);
 
  return (
    <>
      <div className="container-sections-forms">
      <TableComponent
              ref={tableComponent}
              url={`${process.env.urlApiFunds}api/v1/controlSelect/getInfopay`}
              columns={tableColumns}
              //actions={tableActions}
              isShowModal={false}
            />

        <div className="title-area">
          <label className="text-black large medium grid-span-4-columns">Totales</label>
        </div>
        <div className="grid-form-4-container mb-24px">
          <InputComponent
            idInput="approved"
            label="Aprobado"
            className="input-basic medium"
            typeInput="text"
            classNameLabel="text-black big text-required"
            errors={""}
            disabled={true}
            value={""}
          />
          <InputComponent
            idInput="delivered"
            label="Pagaré entregado"
            className="input-basic medium"
            typeInput="text"
            classNameLabel="text-black big text-required"
            disabled={true}
            value={""}
          />
          <InputComponent
            idInput="undelivered"
            label="Sin entregar"
            className="input-basic medium"
            typeInput="text"
            classNameLabel="text-black big text-required"
            disabled={true}
            value={""}
          />
          <InputComponent
            idInput="not_apply"
            label="No aplica"
            className="input-basic medium"
            typeInput="text"
            classNameLabel="text-black big text-required"
            disabled={true}
            value={""}
          />
        </div>
      </div>

      <div>
        <br />
        <hr className="barra-spacing" />
      </div>
      {sendingReportXlsx ? (
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
      ) : ''}


    </>
  );
};

export default PagareTab;
