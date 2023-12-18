import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";
import TableComponent from "../../../../common/components/table.component";
import useSocialServices from "./hook/social-services.hook";

function SocialServices() {
  const { tableColumns, tableComponentRef } = useSocialServices();
  const [showSpinner, setShowSpinner] = useState(true);

  return (
    <section className=" card-table mt-20px">
      {showSpinner && (
        <ProgressSpinner
          style={{ width: "25px", height: "25px" }}
          animationDuration=".5s"
        />
      )}

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
        title="Horas servicio social"
      />
    </section>
  );
}

export default React.memo(SocialServices);
