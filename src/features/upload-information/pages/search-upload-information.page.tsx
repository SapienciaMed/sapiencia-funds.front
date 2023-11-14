import React from "react";

import { FilterUploadInformationForm } from "../forms/filter-upload-information.form";

import useSearchUploadHook from "../hooks/search-upload-information.hook";

import TableComponent from "../../../common/components/table.component";

const SearchUploadInformationPage = (): React.JSX.Element => {
  const {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    formValues,
    showTable,
    tableComponentRef,
    commune,
    validity,
    information,
    tableColumns,
    tableActions,
  } = useSearchUploadHook();


  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large medium">
          Cargar información
          </label>
        </div>

        <FilterUploadInformationForm
          register={register}
          control={control}
          formState={formState}
          redirectCreate={redirectCreate}
          onSubmit={onSubmit}
          formValues={formValues}
          commune={commune}
          validity={validity}
          information={information}
        />

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiFunds}/api/v1/uploadInformation/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={false}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default React.memo(SearchUploadInformationPage);
