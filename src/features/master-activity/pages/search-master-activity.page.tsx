import React from "react";

import { FilterMasterActivityForm } from "../forms/filter-masteractivity.form";

import useSearchMasterHook from "../hooks/search-master-activity.hook";

import TableComponent from "../../../common/components/table.component";


const SearchMasterPage = (): React.JSX.Element => {
    const {
      control,
      formState,
      onSubmit,
      redirectCreate,
      clearFields,
      formValues,
      showTable,
      //typeProgramList
      tableComponentRef,
      tableColumns,
      tableActions,
    } = useSearchMasterHook();
  
    return (
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black extra-large bold">
            Gestión territorial
            </label>
          </div>
  
          <FilterMasterActivityForm
          control={control}
          formState={formState}
          //typeProgramList = {typeProgramList}
          redirectCreate={redirectCreate}
          clearFields={clearFields}
          onSubmit={onSubmit}
          //formValues={formValues}
          />
          
          {showTable && (
          <div className="container-sections-forms">

          
        </div>
        )}  
        </div>
      </div>
    );
  };  
            

export default React.memo(SearchMasterPage);




