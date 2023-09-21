import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import { FilterMasterActivityForm } from "../forms/filter-masteractivity.form";

import useSearchMasterHook from "../hooks/search-master-activity.hook";


const SearchMasterPage = (): React.JSX.Element => {
    const {
      control,
      formState,
      redirectCreate,
      clearFields,
      onSubmit,
      charges,


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
            redirectCreate={redirectCreate}
            clearFields={clearFields}
            onSubmit={onSubmit}
            chargesState={charges}
          />


      </div>
    </div>
  );
};           
            

export default React.memo(SearchMasterPage);




