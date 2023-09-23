import React from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { Controller } from "react-hook-form";
import useCreateMasterActivity from "../hooks/create-master-activity.hook";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  addBusinessDays,
  addCalendarDays,
} from "../../../common/utils/helpers";


const CreateMasterActivityPage = (): React.JSX.Element => {
    const {

    } = useCreateMasterActivity();
  
      return (
        <div className="main-page">
          <div className="card-table">
            <div className="title-area">
              <label className="text-black extra-large bold">Gestión territorial</label>
              
              <div
                className="title-button text-main biggest pointer"
                
              >
                maestro actividad <AiOutlinePlusCircle />
              </div>
          </div>
            

        
          </div>
        </div>
      );
    };
    
    export default React.memo(CreateMasterActivityPage);