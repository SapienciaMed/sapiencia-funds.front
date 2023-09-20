import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import TableComponent from "../../../common/components/table.component";

import useCreateAndUpdateMaster from "../hooks/CreateAndUpdateMaster";


const CreateUpdateMasterPage = (): React.JSX.Element => {
    const {

    } = useCreateAndUpdateMaster();
  
      return (
        <div className="main-page">
          <div className="card-table">
            <div className="title-area">
              <label className="text-black extra-large bold">Deducciones</label>
              
              <div
                className="title-button text-main biggest pointer"
                
              >
                Crear deducción <AiOutlinePlusCircle />
              </div>
          </div>
            

        
          </div>
        </div>
      );
    };
    
    export default React.memo(CreateUpdateMasterPage);