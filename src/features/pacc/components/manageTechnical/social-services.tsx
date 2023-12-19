import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";
import TableComponent from "../../../../common/components/table.component";
import useSocialServices from "./hook/social-services.hook";
import { Dialog } from "primereact/dialog";
import UploadNewComponent from "../../../../common/components/Form/UploadNewComponent";
import { ButtonComponent } from "../../../../common/components/Form";

function SocialServices() {
  const {
    tableColumns,
    tableComponentRef,
    visible,
    setVisible,
    setFilesUploadData,
  } = useSocialServices();
  const [showSpinner, setShowSpinner] = useState(true);

  return (
    <section className=" card-table mt-20px">
      {showSpinner && (
        <ProgressSpinner
          style={{ width: "25px", height: "25px" }}
          animationDuration=".5s"
        />
      )}

      <Dialog
        header="Si tienes más de un documento, se deben unir en un solo archivo para ser cargados"
        className="text-center div-modal movil"
        visible={visible}
        onHide={() => setVisible(false)}
        pt={{
          root: { style: { width: "35em" } },
        }}
      >
        <UploadNewComponent
          id="cargarArchivo"
          dataArchivo={(files: File) => {
            if (files && files.name) {
              setFilesUploadData(files);
              setVisible(false);
            }
          }}
          showModal={(e: boolean) => {
            setVisible(e);
          }}
          titleFilesAccept="Solo es permitido el formato PDF"
          filesAccept="application/pdf"
        />
        <div className="modal-footer" style={{ margin: "1rem" }}>
          <ButtonComponent
            value="Cancelar"
            className="button-ok small"
            type="button"
            action={() => {
              setVisible(false);
              setFilesUploadData(null);
            }}
          />
        </div>
      </Dialog>

      <TableComponent
        ref={tableComponentRef}
        url={`${process.env.urlApiFunds}/api/v1/service-social/get-paginated`}
        columns={tableColumns}
        titleMessageModalNoResult="Buscar"
        descriptionModalNoResult="No se encontraron datos de servicio social"
        isShowModal={true}
        classSizeTable="size-table-wd-110"
        princialTitle="Servicio social"
        isMobil={false}
        viePaginator={false}
        isNotBorderClasse={true}
        setShowSpinner={setShowSpinner}
      />
    </section>
  );
}

export default React.memo(SocialServices);
