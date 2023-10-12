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
    onSubmit,
    renderTitleMasterActivity
  } = useCreateMasterHook(action);
  
  return (
    <>
    <div className="container-sections-forms m-24px">
        <div className="title-area">
          <label className="text-black extra-large medium">
           {renderTitleMasterActivity()}
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
    </>
  );
};

export default React.memo(MasterActivityCreatePage);
