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
    //tableColumns,
    //tableActions,
  } = useSearchUploadHook();


  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
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
        />

      </div>
    </div>
  );
};

export default React.memo(SearchUploadInformationPage);
