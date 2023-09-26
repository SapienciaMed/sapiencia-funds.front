import React from "react";

import { FilterMasterActivityForm } from "../forms/filter-masteractivity.form";

import useSearchMasterHook from "../hooks/search-master-activity.hook";

import TableComponent from "../../../common/components/table.component";


const SearchMasterPage = (): React.JSX.Element => {
  
    return (
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black extra-large bold">
            Consultar y modificar maestro actividad 
            </label>
          </div>
  
          <FilterMasterActivityForm
          
          />
          
          

      </div>
    </div>
    );
  };  
            

export default React.memo(SearchMasterPage);




