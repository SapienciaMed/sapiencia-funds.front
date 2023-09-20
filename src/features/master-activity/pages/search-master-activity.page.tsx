import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import TableComponent from "../../../common/components/table.component";

import useSearchMasterHook from "../hooks/search-master-activity.hook";


const SearchMasterPage = (): React.JSX.Element => {
    const {

    } = useSearchMasterHook();
  
      return (
        <div className="main-page">
          <div className="card-table">
            <div className="title-area">
              <label className="text-black extra-large bold">xxxxxxxx!!x</label>
              
              <div
                className="title-button text-main biggest pointer"
                
              >
                Crear xxxxxx <AiOutlinePlusCircle />
              </div>
          </div>
            

        
          </div>
        </div>
      );
    };
    
    export default React.memo(SearchMasterPage);




