import React from "react";
import { MasterActivityForm } from "../forms/master-activity.form";
import useCreateMasterHook from "../hooks/activity-create-update.hook";

const MasterActivityCreatePage = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    formValues,
    showTable,
    typeProgram,
    tableComponentRef,
  } = useCreateMasterHook();
  
  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Gestión territorial
          </label>
        </div>

        <MasterActivityForm 
         onSubmit={onSubmit}
         formState={formState}
         typeProgram={typeProgram}
        />
      </div>
    </div>
  );
};

export default React.memo(MasterActivityCreatePage);
