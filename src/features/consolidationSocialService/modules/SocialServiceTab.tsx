import React, { useRef } from "react";
import TableComponent from "../../../common/components/table.component";

export const SocialServiceTab = () => {
  const tableComponentRef = useRef(null);

  return (
    <TableComponent
      title="Resultados disponibles socializados"
      ref={tableComponentRef}
      url={`${process.env.urlApiFunds}/api/v1/socialization/get-paginated`}
      columns={[]}
      actions={[]}
      isShowModal={false}
    />
  );
};
