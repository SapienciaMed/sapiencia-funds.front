import React from "react";
import { MasterActivityForm } from "../forms/master-activity.form";
import useCreateMasterHook from "../hooks/activity-create-update.hook";

interface IPropsCreateUpdateActivity {
  action: string;
}

const MasterActivityCreatePage = ({
  action,
}: IPropsCreateUpdateActivity): React.JSX.Element => {
  const {
    control,
    formState,
    typeProgram,
    tableComponentRef,
    redirectCancel,
    onSubmit
  } = useCreateMasterHook(action);
  
  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Gestión territorial
          </label>
        </div>

        <MasterActivityForm 
         control={control}
         formState={formState}
         action={action}
         typeProgram={typeProgram}
         redirectCancel={redirectCancel}
         onSubmit ={onSubmit}
        />
      </div>
    </div>
  );
};

export default React.memo(MasterActivityCreatePage);
